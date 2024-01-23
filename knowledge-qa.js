import { openai } from "./openai.js";
// import {Document} from "langchain/document"; // this libs is deprecated
import {Document} from "@langchain/core/documents"
import {MemoryVectorStore} from "langchain/vectorstores/memory";
// import {OpenAIEmbeddings} from "langchain/embeddings/openai"; //this libs is deprecated
import {OpenAIEmbeddings} from "@langchain/openai"
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {YoutubeLoader} from "langchain/document_loaders/web/youtube";
import {CharacterTextSplitter} from "langchain/text_splitter"

import {
  PlaywrightWebBaseLoader
} from "langchain/document_loaders/web/playwright"

const url = "https://medium.com/rareskills/smart-contract-security-in-solidity-32e777d2d711"
const url2 = "https://medium.com/@pollymackintosh/medicine-is-sober-dancing-the-new-ecstasy-f5333c282a7f"
const question = process.argv[2] || "Hi, how are you?";
const video = `https://youtu.be/64wTF8b6hl4?si=6vSoGw6xDVOwj76f`
const video2 = `https://youtu.be/r1D4i0oQmPo?si=-t_lFPw-mPNzPVMn`

export const createStore = (docs) =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())

export const docsFromVideo = (video) => {
  const loader = YoutubeLoader.createFromUrl(video, {
    language: "en",
    addVideoInfo: true,
  })
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: " ",
      chunkSize: 2500,
      cunkOverlap: 100,
    })
  )
}

export const docsFromWeb = (url) => {
  const loader = new PlaywrightWebBaseLoader(url)
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: ". ",
      chunkSize: 3000,
      cunkOverlap: 200,
    })
  )
}

export const docsFromPDF = () => {
  const loader = new PDFLoader("./bitcoin.pdf")
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: ". ",
      chunkSize: 2500,
      cunkOverlap: 200,
    })
  )
}

const loadStore = async () => {
  const videoDocs = await docsFromVideo(video2)
  const pdfDocs = await docsFromPDF()
  const webDocs = await docsFromWeb(url2)

  // return createStore([...videoDocs])
  // return createStore([...videoDocs, ...pdfDocs])
  return createStore([webDocs[0]])
}

const query = async () => {
  const store = await loadStore()
  const results = await store.similaritySearch(question, 2)
  
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: "You are a helpful AI assistant. Answer questions to your best ability and accuracy."
      },
      {
        role: 'user',
        content: `
        Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
        Question: ${question}
        Context: ${results.map((r) => r.pageContent).join("\n")}`,
      },
    ],
  })

  console.log(`
    Answer: ${res.choices[0].message.content}\n\nSource: ${results.map((r) => r.metadata.source).join(", ")}
  `)
}

loadStore()