import React, { useState, useEffect } from "react"
import api, { getTodayDate } from "../api/axiosInstance"

const Goals = () => {
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState("")
  const [targetDate, setTargetDate] = useState(getTodayDate())
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchGoals = async () => {
    try {
      const response = await api.get("/goals")
      setGoals(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching goals:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  const handleCreateGoal = async (e) => {
    e.preventDefault()
    try {
      await api.post("/goals", { title, description, targetDate })
      setTitle("")
      setDescription("")
      setTargetDate(getTodayDate())
      fetchGoals() // Refresh list
    } catch (error) {
      console.error("Error creating goal:", error)
    }
  }

  const handleToggleAchieved = async (goal) => {
    try {
      const newAchievedStatus = !goal.achieved
      await api.put(`/goals/${goal.id}`, {
        ...goal,
        achieved: newAchievedStatus,
      })
      fetchGoals() // Refresh list
    } catch (error) {
      console.error("Error updating goal:", error)
    }
  }

  const handleDeleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return
    try {
      await api.delete(`/goals/${id}`)
      fetchGoals() // Refresh list
    } catch (error) {
      console.error("Error deleting goal:", error)
    }
  }

  if (loading) return <p>Loading goals...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🎯 Fitness Goals
      </h1>

      {/* Goal Creation Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Set a New Goal</h2>
        <form
          onSubmit={handleCreateGoal}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Goal Title (e.g., Lose 5kg)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Add Goal
          </button>
        </form>
      </div>

      {/* Goal List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex justify-between items-center p-4 shadow-md rounded-lg transition ${
              goal.achieved
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-white border-l-4 border-indigo-500"
            }`}
          >
            <div>
              <h3
                className={`text-lg font-semibold ${
                  goal.achieved ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {goal.title}
              </h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Target: {goal.targetDate}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  goal.achieved
                    ? "bg-green-500 text-white"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {goal.achieved ? "Achieved" : "In Progress"}
              </span>
              <button
                onClick={() => handleToggleAchieved(goal)}
                className={`text-sm py-1 px-3 rounded-md transition ${
                  goal.achieved
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                {goal.achieved ? "Unmark" : "Mark Achieved"}
              </button>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 6h6v10H7V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {!goals.length && (
        <p className="text-center text-gray-500 mt-10">
          You haven't set any goals yet.
        </p>
      )}
    </div>
  )
}

export default Goals
