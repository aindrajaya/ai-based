import { openai } from "./openai.js";
import readline from "node:readline"; //call node.js internal package readline

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const newMessage = async (history, message) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [...history, message]
  }); //create a new chat

  return res.choices[0].message; //return the message
}

const formatMessage = (userInput) => ({
  role: "user",
  content: userInput
})

const chat = () => {
  const history = [
    {
      role: "system",
      content: "You are an AI Assistant. Just answer the user's questions with your best ability."
    }
  ]
  
  const start = () => {
    rl.question("Human: ", async(userInput) => {
      if(userInput.toLowerCase() === "exit") {
        rl.close()
        return
      }

      const userMessage = formatMessage(userInput);
      const response = await newMessage(history, userMessage);

      history.push(userMessage, response);
      console.log(`\n\nAI Assistant: ${response.content}\n\n`);
      start();
    })
  }

  start();
  console.log("AI Assistant: How can I help you today?\n\n");
}

console.log("Chatbot Initialized. Type 'exit' to quit");
chat();

