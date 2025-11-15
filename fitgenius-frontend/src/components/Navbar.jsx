import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Dumbbell } from "lucide-react"
export default function Navbar() {
  const { token, logout } = useContext(AuthContext)

  return (
    <nav>
      <header className="bg-gray-700 text-white py-4 px-6 flex items-center justify-between gap-3">
        <span className="flex gap-3">
          <Dumbbell size={26} />
          <h1 className="text-lg font-semibold">
            FitGenius – AI Fitness Coach
          </h1>
        </span>
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
      </header>
    </nav>
  )
}
