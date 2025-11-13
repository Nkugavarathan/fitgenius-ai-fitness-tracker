import React, { useEffect, useState } from "react"
import api from "../api/axiosInstance.js"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
const WorkoutTable = () => {
  const [workouts, setWorkouts] = useState([])
  const [form, setForm] = useState({ exerciseName: "", sets: "", reps: "" })

  // useEffect(() => {
  //   loadWorkouts()
  // }, [])
  const location = useLocation()

  useEffect(() => {
    // only load workouts if current path is /workouts
    if (location.pathname === "/workouts") {
      loadWorkouts()
    }
  }, [location.pathname])

  const loadWorkouts = async () => {
    const loadingToast = toast.loading("Loading workouts...")

    try {
      const res = await api.get("/workouts")
      console.log(res)
      toast.dismiss(loadingToast) // remove loading toast
      toast.success("Workouts loaded ✅")
      setWorkouts(res.data)
    } catch (err) {
      toast.error(err.message, "❌")

      console.error(
        "Failed to load workouts:",
        err.response?.data || err.message
      )
    }
  }

  const submitWorkout = async (e) => {
    e.preventDefault()
    try {
      await api.post("/workouts", form)
      setForm({ exerciseName: "", sets: "", reps: "" })
      toast.success("Workout created successfully ")

      loadWorkouts()
    } catch (err) {
      console.error("Failed to add workout:", err.response?.data || err.message)
    }
  }

  const removeWorkout = async (id) => {
    try {
      await api.delete(`/workouts/${id}`)
      toast.success("Workout deleted successfully ")
      loadWorkouts()
    } catch (err) {
      console.error(
        "Failed to delete workout:",
        err.response?.data || err.message
      )
      toast.error("Failed to delete workout ")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Workout Tracker 💪
      </h2>

      {/* Add Workout Form */}
      <form
        onSubmit={submitWorkout}
        className="flex flex-wrap gap-4 mb-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md w-full max-w-3xl"
      >
        <input
          type="text"
          placeholder="Exercise Name"
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.exerciseName}
          onChange={(e) => setForm({ ...form, exerciseName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Sets"
          className="w-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.sets}
          onChange={(e) => setForm({ ...form, sets: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Reps"
          className="w-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.reps}
          onChange={(e) => setForm({ ...form, reps: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Workouts Table */}
      <div className="overflow-x-auto w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4">Exercise</th>
              <th className="py-3 px-4">Sets</th>
              <th className="py-3 px-4">Reps</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length > 0 ? (
              workouts.map((w) => (
                <tr
                  key={w.id}
                  className="border-b border-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-4">{w.exerciseName}</td>
                  <td className="py-3 px-4">{w.sets}</td>
                  <td className="py-3 px-4">{w.reps}</td>
                  <td className="py-3 px-4">{w.date}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => removeWorkout(w.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No workouts yet. Add your first one! 🏋️
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WorkoutTable
