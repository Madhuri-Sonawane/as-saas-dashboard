import { useEffect, useState } from "react"
import PageWrapper from "../components/layout/PageWrapper"
import { db } from "../services/firebase"
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { Bot, Clock, Trash2, Search, Zap } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

function HistoryPage() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const { user } = useAuth()

  const fetchConversations = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(db, "conversations"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setConversations(data)
    } catch (err) {
      toast.error("Failed to load history")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "conversations", id))
      setConversations((prev) => prev.filter((c) => c.id !== id))
      toast.success("Deleted successfully")
    } catch (err) {
      toast.error("Failed to delete")
    }
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
      <Toaster position="top-right" />

      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">History</h1>
            <p className="text-gray-400 text-sm mt-1">
              All your past AI conversations
            </p>
          </div>
          <span className="text-sm text-gray-400">
            {conversations.length} conversations
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Bot size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">No conversations yet</h3>
            <p className="text-gray-400 text-sm mt-1">
              Start chatting with AI Assistant to see history here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((conv) => (
              <div
                key={conv.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-start justify-between gap-4">

                  {/* Left */}
                  <div className="flex items-start gap-4 flex-1 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                      <Bot size={18} className="text-sky-500" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {conv.prompt}
                      </p>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
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

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(conv.id)}
                    className="opacity-0 group-hover:opacity-100 transition p-2 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>

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