import { useState } from "react"
import PageWrapper from "../components/layout/PageWrapper"
import ChatBox from "../components/ai/ChatBox"
import PromptInput from "../components/ai/PromptInput"
import { sendMessageToGemini } from "../services/gemini"
import { Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { db } from "../services/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

function AIAssistantPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSend = async (input) => {
    if (loading) return

    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const reply = await sendMessageToGemini(updatedMessages)

      const assistantMessage = { role: "assistant", content: reply }
      setMessages([...updatedMessages, assistantMessage])

      // Save to Firestore
      try {
        await addDoc(collection(db, "conversations"), {
          userId: user.uid,
          prompt: input,
          response: reply,
          tokens: Math.floor((input.length + reply.length) / 4),
          createdAt: serverTimestamp(),
        })
      } catch (firestoreErr) {
        console.error("Firestore save error:", firestoreErr)
      }

    } catch (err) {
      console.error("Gemini error:", err)
      toast.error("Failed to get response. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    if (loading) return
    setMessages([])
    toast.success("Chat cleared!")
  }

  return (
    <PageWrapper>
      <Toaster position="top-right" />

      <div className="flex flex-col h-[calc(100vh-112px)]">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Assistant
            </h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Powered by Google Gemini
            </p>
          </div>

          {messages.length > 0 && !loading && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 size={15} />
              Clear chat
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden p-4 min-h-0">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <ChatBox messages={messages} loading={loading} onSend={handleSend} />
          </div>

          {/* Input */}
          <div className="mt-3 flex-shrink-0">
            <PromptInput onSend={handleSend} loading={loading} />
            <p className="text-center text-xs text-gray-300 dark:text-gray-600 mt-2">
              AI can make mistakes. Verify important information.
            </p>
          </div>

        </div>

      </div>
    </PageWrapper>
  )
}

export default AIAssistantPage