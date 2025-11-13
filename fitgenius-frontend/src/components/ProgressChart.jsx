import React, { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import api from "../api/axiosInstance.js"
//volume = sets × reps
const ProgressChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    api
      .get("/workouts")
      .then((res) => {
        const formatted = res.data.map((workout) => ({
          date: workout.date,
          volume: workout.sets * workout.reps, // calculate volume
          exercise: workout.exerciseName,
        }))
        setData(formatted)
      })
      .catch((err) => console.error("Failed to load workouts", err))
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">
        Workout Progress (Total Volume)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: "Volume(sets x reps)",
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
    </div>
  )
}

export default ProgressChart
