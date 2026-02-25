import { useEffect, useState } from "react"
import PageWrapper from "../components/layout/PageWrapper"
import { db } from "../services/firebase"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { Bot, Clock, Search, Zap, MessageSquare } from "lucide-react"
import { useNavigate } from "react-router-dom"

function HistoryPage() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const { user } = useAuth()
  const navigate = useNavigate()

  // Live real-time history using onSnapshot
  useEffect(() => {
    if (!user?.uid) return

    const q = query(
      collection(db, "conversations"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setConversations(data)
      setLoading(false)
    }, (err) => {
      console.error("History error:", err)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user?.uid])

  const handleOpen = (conv) => {
    navigate("/ai-assistant", {
      state: {
        messages: [
          { role: "user", content: conv.prompt },
          { role: "assistant", content: conv.response },
        ]
      }
    })
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now"
    const date = timestamp.toDate()
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filtered = conversations.filter((c) =>
    c.prompt.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">History</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Click any conversation to continue it
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
            <span className="text-sm text-gray-400">{conversations.length} conversations</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 animate-pulse">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <Bot size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No conversations yet
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Start chatting with AI Assistant to see history here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleOpen(conv)}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-sky-200 dark:hover:border-sky-800 transition group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                      <Bot size={18} className="text-sky-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {conv.prompt}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                        {conv.response}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          {formatTime(conv.createdAt)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Zap size={11} />
                          {conv.tokens} tokens
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Continue button */}
                  <div className="flex items-center flex-shrink-0">
                    <span className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 text-xs text-sky-500 font-medium bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-lg">
                      <MessageSquare size={12} />
                      Continue
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </PageWrapper>
  )
}

export default HistoryPage