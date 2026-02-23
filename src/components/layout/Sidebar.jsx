import { useState } from "react"
import { NavLink } from "react-router-dom"
import { NAV_LINKS } from "../../constants"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  return (
    <aside
      className={`relative flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sky-600 text-white flex-shrink-0">
          <Sparkles size={18} />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
            AI Dashboard
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 px-3 py-6 flex-1">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-sm flex-shrink-0">
              {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition z-10"
      >
        {collapsed
          ? <ChevronRight size={12} className="text-gray-500" />
          : <ChevronLeft size={12} className="text-gray-500" />
        }
      </button>
    </aside>
  )
}

export default Sidebar