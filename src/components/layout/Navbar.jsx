import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { LogOut, Bell } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (err) {
      toast.error("Logout failed")
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
      <Toaster position="top-right" />

      {/* Left - Page will inject title via context later */}
      <div>
        <p className="text-sm text-gray-400">
          Welcome back,{" "}
          <span className="font-semibold text-gray-700">
            {user?.displayName || "User"}
          </span>{" "}
          👋
        </p>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">

        {/* Notification Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm">
          {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition px-3 py-2 rounded-xl hover:bg-red-50"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar