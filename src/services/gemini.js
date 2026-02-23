import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" })

export const sendMessageToGemini = async (messages) => {
  try {
    if (messages.length === 1) {
      const result = await model.generateContent(messages[0].content)
      const response = await result.response
      return response.text()
    }

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(lastMessage)
    const response = await result.response
    return response.text()

  } catch (error) {
    console.error("Gemini error:", error)
    throw error
  }
}
