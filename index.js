import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI();

const chat = 
  await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Origin story, your an AI Assistant"
      },
      {
        role: "user",
        content: "Hi!, can you help me to learn advanced code?"
      }
    ]
  })

console.log(chat.choices[0].message.content)