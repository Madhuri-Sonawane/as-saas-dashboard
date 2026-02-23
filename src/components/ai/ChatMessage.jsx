import { Bot, User } from "lucide-react"

function ChatMessage({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>

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
          : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
      }`}>
        {message.content}
      </div>

    </div>
  )
}

export default ChatMessage