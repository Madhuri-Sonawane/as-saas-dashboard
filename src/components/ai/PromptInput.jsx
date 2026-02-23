import { Send } from "lucide-react"
import { useState } from "react"

function PromptInput({ onSend, loading }) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim() || loading) return
    onSend(input.trim())
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything... (Enter to send)"
        rows={1}
        className="flex-1 resize-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none max-h-32 bg-transparent"
        style={{ minHeight: "24px" }}
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || loading}
        className="w-9 h-9 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-200 dark:disabled:bg-gray-700 rounded-xl flex items-center justify-center transition flex-shrink-0"
      >
        <Send size={15} className={input.trim() && !loading ? "text-white" : "text-gray-400"} />
      </button>
    </div>
  )
}

export default PromptInput