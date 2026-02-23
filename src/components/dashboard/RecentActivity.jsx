import { Bot, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    prompt: "Explain quantum computing in simple terms",
    time: "2 mins ago",
    tokens: 312,
  },
  {
    id: 2,
    prompt: "Write a React component for a login form",
    time: "1 hour ago",
    tokens: 528,
  },
  {
    id: 3,
    prompt: "Summarize this article about AI trends",
    time: "3 hours ago",
    tokens: 204,
  },
  {
    id: 4,
    prompt: "Fix this Python bug in my sorting algorithm",
    time: "Yesterday",
    tokens: 416,
  },
  {
    id: 5,
    prompt: "Generate 10 creative startup name ideas",
    time: "Yesterday",
    tokens: 178,
  },
]

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        <p className="text-sm text-gray-400">Your latest AI conversations</p>
      </div>

      <div className="flex flex-col gap-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-sky-500" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.prompt}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={11} />
                  {item.time}
                </span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-400">
                  {item.tokens} tokens
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity