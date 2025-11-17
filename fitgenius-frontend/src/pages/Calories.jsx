import React, { useState, useEffect } from "react"
import api from "../api/axiosInstance"

// Helper function to format date for display
const formatDate = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString()
}

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]

const Calories = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [newEntry, setNewEntry] = useState({
    calories: "",
    mealType: mealTypes[0],
    date: "", // Use YYYY-MM-DD format for input
  })
  const [error, setError] = useState(null)

  // --- Data Fetching ---
  const fetchEntries = async () => {
    try {
      setLoading(true)
      const response = await api.get("/calories")
      setEntries(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching calorie entries:", err)
      setError("Failed to load entries. Please check the server connection.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  // --- Form Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewEntry((prev) => ({
      ...prev,
      [name]: name === "calories" ? (value === "" ? "" : Number(value)) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic Validation
    if (!newEntry.calories || newEntry.calories <= 0) {
      setError("Please enter a valid calorie count.")
      return
    }

    try {
      // If date is empty, the backend will default to today's date
      const dataToSend = {
        ...newEntry,
        date: newEntry.date || null,
      }

      await api.post("/calories", dataToSend)
      setNewEntry({ calories: "", mealType: mealTypes[0], date: "" }) // Reset form
      fetchEntries() // Refresh the list
      setError(null)
    } catch (err) {
      console.error("Error adding calorie entry:", err)
      setError("Failed to add entry. Check input data and server.")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this calorie entry?")) {
      try {
        await api.delete(`/calories/${id}`)
        fetchEntries() // Refresh the list
      } catch (err) {
        console.error("Error deleting calorie entry:", err)
        setError("Failed to delete entry.")
      }
    }
  }

  if (loading)
    return <div className="text-center p-8">Loading calorie log...</div>

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-blue-100 p-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center pb-2">
        🍎 Calorie Log
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* --- Add Calorie Form --- */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-indigo-500">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add New Entry
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calories
            </label>
            <input
              type="number"
              name="calories"
              value={newEntry.calories}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Type
            </label>
            <select
              name="mealType"
              value={newEntry.mealType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
              required
            >
              {mealTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date (Optional)
            </label>
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log Calories
            </button>
          </div>
        </form>
      </div>

      {/* --- Calorie Entry List --- */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Your Logged Entries ({entries.length})
        </h2>

        {entries.length === 0 ? (
          <p className="text-gray-500">No calorie entries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meal Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Entries are sorted by the backend by date ascending, but we display the latest first */}
                {[...entries].reverse().map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatDate(entry.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.mealType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {entry.calories}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calories
