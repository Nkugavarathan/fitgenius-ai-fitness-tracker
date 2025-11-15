import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [data, setData] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/login", data)
      login(res.data.token)
      toast.success("Successfully logged in 🎉")
      navigate("/dashboard")
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message)
      toast.error(err.response?.data?.message || "Login failed ❌")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 mb-4 w-72 rounded"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 mb-4 w-72 rounded"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
          Login
        </button>
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
