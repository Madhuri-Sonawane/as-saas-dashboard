import { useState } from "react"
import PageWrapper from "../components/layout/PageWrapper"
import { useAuth } from "../context/AuthContext"
import { db } from "../services/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { updateProfile, updatePassword, deleteUser } from "firebase/auth"
import { auth } from "../services/firebase"
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import {
  User,
  Mail,
  Lock,
  Trash2,
  Save,
  Shield,
  BarChart2,
} from "lucide-react"

function SettingsPage() {
  const { user, logout } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loadingName, setLoadingName] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [stats, setStats] = useState({ total: 0, tokens: 0 })

  // Fetch usage stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(
          collection(db, "conversations"),
          where("userId", "==", user.uid)
        )
        const snapshot = await getDocs(q)
        const docs = snapshot.docs.map((d) => d.data())
        const totalTokens = docs.reduce((sum, d) => sum + (d.tokens || 0), 0)
        setStats({ total: docs.length, tokens: totalTokens })
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  // Update display name
  const handleUpdateName = async () => {
    if (!displayName.trim()) {
      toast.error("Name cannot be empty")
      return
    }
    setLoadingName(true)
    try {
      await updateProfile(auth.currentUser, { displayName })
      toast.success("Name updated successfully!")
    } catch (err) {
      toast.error("Failed to update name")
    } finally {
      setLoadingName(false)
    }
  }

  // Update password
  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both fields")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    setLoadingPassword(true)
    try {
      await updatePassword(auth.currentUser, newPassword)
      toast.success("Password updated successfully!")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      toast.error("Failed to update password. Please re-login and try again.")
    } finally {
      setLoadingPassword(false)
    }
  }

  // Delete account
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    )
    if (!confirmed) return
    setLoadingDelete(true)
    try {
      await deleteUser(auth.currentUser)
      await logout()
      toast.success("Account deleted")
    } catch (err) {
      toast.error("Failed to delete. Please re-login and try again.")
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <PageWrapper>
      <Toaster position="top-right" />

      <div className="flex flex-col gap-6 max-w-2xl">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account and preferences
          </p>
        </div>

        {/* Usage Stats */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={18} className="text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">Your Usage</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-sky-600">{stats.total}</p>
              <p className="text-sm text-gray-500 mt-1">Total Conversations</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-violet-600">{stats.tokens}</p>
              <p className="text-sm text-gray-500 mt-1">Total Tokens Used</p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">Account Info</h2>
          </div>

          {/* Email - readonly */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <Mail size={15} className="text-gray-400" />
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>

          {/* Display Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          <button
            onClick={handleUpdateName}
            disabled={loadingName}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50"
          >
            <Save size={15} />
            {loadingName ? "Saving..." : "Save Name"}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">Change Password</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          <button
            onClick={handleUpdatePassword}
            disabled={loadingPassword}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50"
          >
            <Shield size={15} />
            {loadingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 size={18} className="text-red-500" />
            <h2 className="text-base font-bold text-red-600">Danger Zone</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Once you delete your account all your data will be permanently removed.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={loadingDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50"
          >
            <Trash2 size={15} />
            {loadingDelete ? "Deleting..." : "Delete Account"}
          </button>
        </div>

      </div>
    </PageWrapper>
  )
}

export default SettingsPage