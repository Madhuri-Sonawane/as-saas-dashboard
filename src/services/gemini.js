import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export const sendMessageToGemini = async (messages) => {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

  const lastMessage = messages[messages.length - 1].content

  // Build history excluding last message
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }))

  const chat = model.startChat({ history })
  const result = await chat.sendMessage(lastMessage)
  const text = result.response.text()
  return text
}