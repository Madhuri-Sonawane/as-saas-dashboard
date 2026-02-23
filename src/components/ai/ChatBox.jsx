import { useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"
import { Bot } from "lucide-react"

function ChatBox({ messages, loading, onSend }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  if (messages.length === 0 && !loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center">
          <Bot size={32} className="text-violet-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            How can I help you today?
          </h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Ask me anything — code, writing, analysis, and more.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {[
            "Explain React hooks",
            "Write a cover letter",
            "Debug my code",
            "Summarize a topic",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSend(suggestion)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full cursor-pointer transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-2 py-2">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}

      {/* Show loading dots ONLY while waiting for response */}
      {loading && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
            <Bot size={14} className="text-white" />
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <div className="flex gap-1 items-center h-5">
              <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default ChatBox