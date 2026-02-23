import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", queries: 4 },
  { day: "Tue", queries: 9 },
  { day: "Wed", queries: 6 },
  { day: "Thu", queries: 14 },
  { day: "Fri", queries: 11 },
  { day: "Sat", queries: 7 },
  { day: "Sun", queries: 13 },
]

function UsageChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Weekly Usage</h2>
        <p className="text-sm text-gray-400">Your AI queries over the past 7 days</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              fontSize: "13px",
            }}
          />
          <Area
            type="monotone"
            dataKey="queries"
            stroke="#0ea5e9"
            strokeWidth={2.5}
            fill="url(#colorQueries)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UsageChart