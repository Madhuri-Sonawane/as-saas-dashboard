import { Bot, User, ThumbsUp, ThumbsDown, Copy, Check, Pencil, X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useState } from "react"
import toast from "react-hot-toast"

function ChatMessage({ message, onEdit }) {
  const isUser = message.role === "user"
  const [liked, setLiked] = useState(null) // "up" | "down" | null
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(message.content)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy")
    }
  }

  const handleLike = (type) => {
    if (liked === type) {
      setLiked(null)
    } else {
      setLiked(type)
      toast.success(type === "up" ? "Glad it helped! 👍" : "Thanks for feedback! 👎")
    }
  }

  const handleEditSave = () => {
    if (!editText.trim()) return
    onEdit(editText.trim())
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditText(message.content)
    setIsEditing(false)
  }

  return (
    <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>

      <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} w-full`}>

        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-sky-500" : "bg-violet-500"
        }`}>
          {isUser
            ? <User size={14} className="text-white" />
            : <Bot size={14} className="text-white" />
          }
        </div>

        {/* Bubble */}
        <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-sky-500 text-white rounded-tr-sm"
            : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm"
        }`}>

          {/* User message — show edit input or text */}
          {isUser ? (
            isEditing ? (
              <div className="flex flex-col gap-2 min-w-[200px]">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-sky-400 text-white placeholder-sky-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleEditCancel}
                    className="px-3 py-1 text-xs bg-sky-400 hover:bg-sky-300 text-white rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSave}
                    className="px-3 py-1 text-xs bg-white text-sky-600 hover:bg-sky-50 rounded-lg font-medium transition"
                  >
                    Save & Resend
                  </button>
                </div>
              </div>
            ) : (
              <p>{message.content}</p>
            )
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <div className="mb-2 last:mb-0 text-sm leading-relaxed">{children}</div>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold mb-2 mt-3 text-gray-900 dark:text-white">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-bold mb-2 mt-3 text-gray-900 dark:text-white">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-bold mb-1 mt-3 text-gray-900 dark:text-white">{children}</h3>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  code: ({ inline, children }) =>
                    inline ? (
                      <code className="bg-gray-100 dark:bg-gray-800 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 overflow-x-auto my-2">
                        <code className="text-xs font-mono text-gray-800 dark:text-gray-200">
                          {children}
                        </code>
                      </pre>
                    ),
                  hr: () => <hr className="border-gray-200 dark:border-gray-700 my-3" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-2">
                      <table className="text-xs border-collapse w-full">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 font-semibold text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                      {children}
                    </td>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {/* User message — Edit button */}
      {isUser && !isEditing && (
        <div className="flex items-center gap-1 mr-11">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-gray-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition"
          >
            <Pencil size={11} />
            Edit
          </button>
        </div>
      )}

      {/* AI message — Like, Dislike, Copy buttons */}
      {!isUser && (
        <div className="flex items-center gap-1 ml-11">

          {/* Copy */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition ${
              copied
                ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>

          {/* Like */}
          <button
            onClick={() => handleLike("up")}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition ${
              liked === "up"
                ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                : "text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <ThumbsUp size={11} />
            {liked === "up" ? "Liked" : "Like"}
          </button>

          {/* Dislike */}
          <button
            onClick={() => handleLike("down")}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition ${
              liked === "down"
                ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            }`}
          >
            <ThumbsDown size={11} />
            {liked === "down" ? "Disliked" : "Dislike"}
          </button>

        </div>
      )}

    </div>
  )
}

export default ChatMessage