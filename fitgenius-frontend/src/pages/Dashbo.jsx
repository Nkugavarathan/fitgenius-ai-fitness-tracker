import React, { useEffect, useState } from "react"
import api from "../api/axiosInstance.js"
import ProgressChart from "../components/ProgressChart.jsx"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    api
      .get("/user/me")
      .then((res) => setUser(res.data))
      .catch(() => console.log("Not logged in"))
  }, [])
  console.log(user)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-8">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">
        {user ? `Welcome, ${user.fullName}!` : "Welcome to FitGenius 💪"}
      </h2>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl p-6 transition transform hover:-translate-y-1 border border-blue-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-500 mb-2">
            Workout Tracker
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Log your exercises and monitor your daily routines with ease.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl p-6 transition transform hover:-translate-y-1 border border-blue-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-500 mb-2">
            Progress Charts
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Visualize your growth and see improvements over time.
          </p>
        </div>

        {/* Card 3 */}
        <Link to="/chatbot">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl p-6 transition transform hover:-translate-y-1 border border-blue-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              AI Fitness Coach
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized AI-powered workout suggestions for your goals.
            </p>
          </div>
        </Link>
      </div>
      <div className="mt-10">
        <ProgressChart />
      </div>
    </div>
  )
}

export default Dashboard
