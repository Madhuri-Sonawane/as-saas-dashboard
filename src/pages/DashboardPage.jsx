import PageWrapper from "../components/layout/PageWrapper"
import StatsCard from "../components/dashboard/StatsCard"
import UsageChart from "../components/dashboard/UsageChart"
import RecentActivity from "../components/dashboard/RecentActivity"
import { useAuth } from "../context/AuthContext"
import { Bot, Zap, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Queries",
    value: "1,284",
    subtitle: "+12% from last week",
    icon: Bot,
    color: "bg-sky-500",
  },
  {
    title: "Tokens Used",
    value: "48.3K",
    subtitle: "+8% from last week",
    icon: Zap,
    color: "bg-violet-500",
  },
  {
    title: "Avg Response Time",
    value: "1.4s",
    subtitle: "Faster than last week",
    icon: Clock,
    color: "bg-emerald-500",
  },
  {
    title: "Productivity Score",
    value: "94%",
    subtitle: "+3% from last week",
    icon: TrendingUp,
    color: "bg-orange-500",
  },
]

function DashboardPage() {
  const { user } = useAuth()

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Good morning, {user?.displayName || "User"} 👋
          </h1>
          <p className="text-gray-400 dark:text-gray-500 mt-1">
            Here's what's happening with your AI usage today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <UsageChart />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}

export default DashboardPage