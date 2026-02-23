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
      className={`relative flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-100">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sky-600 text-white flex-shrink-0">
          <Sparkles size={18} />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
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
                    ? "bg-sky-50 text-sky-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User Info at bottom */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm flex-shrink-0">
              {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition z-10"
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-gray-500" />
        ) : (
          <ChevronLeft size={12} className="text-gray-500" />
        )}
      </button>
    </aside>
  )
}

export default Sidebar