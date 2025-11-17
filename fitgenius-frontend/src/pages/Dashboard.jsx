import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api, { getTodayDate } from "../api/axiosInstance"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

/**
 * Safely calculates volume (sets * reps) and returns 0 for invalid numbers (NaN, null, undefined).
 */
const calculateSafeVolume = (sets, reps) => {
  const numSets = Number(sets)
  const numReps = Number(reps)

  if (isNaN(numSets) || isNaN(numReps) || numSets <= 0 || numReps <= 0) {
    return 0
  }
  return numSets * numReps
}

// --- Helper Components ---

const WeightChart = ({ data }) => {
  // ... (WeightChart component remains the same)
  if (!data || data.length === 0)
    return (
      <p className="p-4 text-center text-gray-500">
        Log some weight entries to see the chart.
      </p>
    )

  const chartData = data.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#4f46e5"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const StatCard = ({ title, value, subtext, color, link }) => {
  // ... (StatCard component remains the same)
  const colorClasses = {
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  }

  return (
    <Link
      to={link}
      className={`block p-6 ${colorClasses[color]} text-white rounded-lg shadow-xl hover:shadow-2xl transition`}
    >
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-4xl font-bold mt-1">{value}</p>
      <p className="text-xs opacity-70 mt-2">{subtext}</p>
    </Link>
  )
}

// --- Main Dashboard Component ---

const DashboardPage = () => {
  // 1. STATE INITIALIZATION (All hooks MUST be at the top)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [workoutChartData, setWorkoutChartData] = useState([]) // State for workout volume chart

  // 2. DATA FETCHING EFFECTS

  // Effect to fetch the main dashboard summary data
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/dashboard/summary")
        setSummary(response.data)
      } catch (error) {
        console.error("Error fetching dashboard summary:", error)
      }
    }
    fetchSummary()
  }, [])

  // Effect to fetch detailed workout data and aggregate volume by date
  useEffect(() => {
    api
      .get("/workouts")
      .then((res) => {
        // Aggregate total volume (sets * reps) by date
        const volumeByDate = res.data.reduce((acc, workout) => {
          const currentVolume = calculateSafeVolume(workout.sets, workout.reps)

          const existingVolume = acc[workout.date] || 0
          acc[workout.date] = existingVolume + currentVolume

          return acc
        }, {})

        // Convert the aggregated map into an array format for Recharts
        const formattedData = Object.keys(volumeByDate)
          .map((date) => ({
            date: date,
            volume: volumeByDate[date],
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date

        setWorkoutChartData(formattedData)
        setLoading(false) // Set loading false after the final required data is fetched
      })
      .catch((err) => {
        console.error("Failed to load workouts for chart:", err)
        setLoading(false)
      })
  }, [])

  // 3. CONDITIONAL RENDERING
  if (loading)
    return <p className="p-8 text-center text-lg">Loading dashboard data...</p>
  if (!summary)
    return (
      <p className="text-center text-red-500 p-8 text-lg">
        Failed to load dashboard data. Please check server connection.
      </p>
    )

  // 4. MAIN RENDER LOGIC
  const { weightSeries, goals, caloriesByDate, workoutsByDate } = summary
  const todayDate = getTodayDate()

  console.log("Today's Date Key:", todayDate)
  console.log("Calories Map Keys:", Object.keys(caloriesByDate))
  console.log("Workouts Map Keys:", Object.keys(workoutsByDate))
  const totalCaloriesToday = caloriesByDate[todayDate] || 0
  const totalWorkoutsToday = workoutsByDate[todayDate] || 0

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-50 to-blue-100 p-15">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🏠 Dashboard Overview
      </h1>

      {/* --- Metrics Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Goals"
          value={goals.length}
          subtext={`${goals.filter((g) => g.achieved).length} Achieved`}
          color="indigo"
          link="/goals"
        />
        <StatCard
          title="Calories Logged Today"
          value={totalCaloriesToday}
          subtext="from Calorie Entries"
          color="blue"
          link="/calories"
        />
        <StatCard
          title="Workouts Today"
          value={totalWorkoutsToday}
          subtext="from Workout Entries"
          color="green"
          link="/workouts"
        />
      </div>

      <hr className="border-gray-300" />

      {/* --- Weight Progress Chart --- */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📉 Weight Progress
        </h2>
        <WeightChart data={weightSeries} />
        <div className="text-right mt-4">
          <Link
            to="/weight"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Manage Weight Log &rarr;
          </Link>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* --- Workout Progress Chart --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          💪 Workout Progress (Total Volume)
        </h2>

        {workoutChartData.length === 0 ? (
          <p className="text-center text-gray-500">
            Log some workouts to see volume progress.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={workoutChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: "Volume (Total Sets x Reps)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <hr className="border-gray-300" />

      {/* --- Current Goals List --- */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🎯 Active Goals
        </h2>
        {goals
          .filter((g) => !g.achieved)
          .slice(0, 5)
          .map((goal) => (
            <div
              key={goal.id}
              className="border-b last:border-b-0 py-3 flex justify-between items-center"
            >
              <p className="font-medium text-gray-700">{goal.title}</p>
              <span className="text-sm text-gray-500">
                Target: {goal.targetDate}
              </span>
            </div>
          ))}
        {goals.filter((g) => !g.achieved).length === 0 && (
          <p className="text-gray-500">No active goals. Set one now!</p>
        )}
        <div className="text-right mt-4">
          <Link
            to="/goals"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Goals &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
