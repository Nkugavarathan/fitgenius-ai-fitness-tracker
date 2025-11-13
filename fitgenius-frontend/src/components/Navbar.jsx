import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
export default function Navbar() {
  const { token, logout } = useContext(AuthContext)

  return (
    <nav className="flex justify-between p-4 bg-gray-200 shadow-md">
      <h1 className="font-bold text-xl">FitGenius</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/workouts">Workouts</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>

        {token ? (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
