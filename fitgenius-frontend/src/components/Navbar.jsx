import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Dumbbell } from "lucide-react"
export default function Navbar() {
  const { token, logout } = useContext(AuthContext)
  const [open, setOpen] = useState()

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
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
            >
              Tracker
            </button>

            {/* Dropdown content */}
            {open && (
              <div className="z-20 absolute mt-2 w-40 rounded-md shadow-lg bg-gradient-to-br from-blue-50 to-blue-100  ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Link
                    to="/workouts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Workouts
                  </Link>
                  <Link
                    to="/calories"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Calories
                  </Link>
                  <Link
                    to="/weightlog"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Weight Log
                  </Link>
                  <Link
                    to="/goals"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Goals
                  </Link>
                </div>
              </div>
            )}
          </div>

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
