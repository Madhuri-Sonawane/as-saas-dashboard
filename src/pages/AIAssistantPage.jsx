import { useState } from "react"
import PageWrapper from "../components/layout/PageWrapper"
import ChatBox from "../components/ai/ChatBox"
import PromptInput from "../components/ai/PromptInput"
import { sendMessageToGemini } from "../services/gemini"
import { Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

function AIAssistantPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async (input) => {
    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const reply = await sendMessageToGemini(updatedMessages)
      setMessages([...updatedMessages, { role: "assistant", content: reply }])
    } catch (err) {
      toast.error("Failed to get response. Check your API key.")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
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
            <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-gray-400 text-sm mt-1">
              Powered by Google Gemini
            </p>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition px-3 py-2 rounded-xl hover:bg-red-50"
            >
              <Trash2 size={15} />
              Clear chat
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col overflow-hidden p-4">
          <ChatBox messages={messages} loading={loading} />

          {/* Input */}
          <div className="mt-3">
            <PromptInput onSend={handleSend} loading={loading} />
            <p className="text-center text-xs text-gray-300 mt-2">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}

export default AIAssistantPage