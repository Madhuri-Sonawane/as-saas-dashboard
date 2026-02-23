import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import { LogOut, Bell, Sun, Moon } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

function Navbar() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
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
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 lg:px-6 pl-16 lg:pl-6 shadow-sm transition-colors duration-200">
      <Toaster position="top-right" />

      {/* Left */}
      <div>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Welcome back,{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {user?.displayName || "User"}
          </span>{" "}
          👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          {darkMode
            ? <Sun size={18} className="text-yellow-400" />
            : <Moon size={18} className="text-gray-500" />
          }
        </button>

        {/* Notification Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <Bell size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-sm">
          {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </header>
  )
}

export default Navbar