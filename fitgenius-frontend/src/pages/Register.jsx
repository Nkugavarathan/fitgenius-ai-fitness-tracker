import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({ fullName: "", email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post("/auth/register", data)
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex   bg-blue-50 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Image Section */}
      <div className=" flex-1 hidden  lg:block ">
        <img src="/register.png" alt="" />
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Create Account
          </h2>

          <input
            type="text"
            required
            placeholder="Full Name"
            className="border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 mb-4 w-full rounded"
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 mb-4 w-full rounded"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 mb-6 w-full rounded"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
