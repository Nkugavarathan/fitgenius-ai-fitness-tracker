import React, { useState, useEffect } from "react"
import api, { getTodayDate } from "../api/axiosInstance"

const WeightLog = () => {
  const [weights, setWeights] = useState([])
  const [weight, setWeight] = useState("")
  const [date, setDate] = useState(getTodayDate())
  const [loading, setLoading] = useState(true)

  const fetchWeightHistory = async () => {
    try {
      const response = await api.get("/weight")
      // Sort by date descending for the list view
      const sortedWeights = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      setWeights(sortedWeights)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching weight history:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeightHistory()
  }, [])

  const handleAddWeight = async (e) => {
    e.preventDefault()
    try {
      await api.post("/weight", { weight: parseFloat(weight), date })
      setWeight("")
      setDate(getTodayDate())
      fetchWeightHistory() // Refresh list
    } catch (error) {
      console.error("Error adding weight entry:", error)
    }
  }

  const handleDeleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this weight entry?"))
      return
    try {
      await api.delete(`/weight/${id}`)
      fetchWeightHistory() // Refresh list
    } catch (error) {
      console.error("Error deleting weight entry:", error)
    }
  }

  if (loading) return <p>Loading weight history...</p>

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-blue-100 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        ⚖️ Weight Log
      </h1>

      {/* Weight Entry Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Log New Weight</h2>
        <form
          onSubmit={handleAddWeight}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="p-2 border rounded-md"
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>

      {/* Weight History Table */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        History
      </h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weights.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.weight} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!weights.length && (
          <p className="p-4 text-center text-gray-500">
            No weight entries logged yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default WeightLog
