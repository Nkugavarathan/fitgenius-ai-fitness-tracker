import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Dumbbell, Menu, X } from "lucide-react"
export default function Navbar() {
  const { token, logout } = useContext(AuthContext)
  const [dropdownOpen, setdropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-800/70 shadow-md">
      <header className="bg-gray-700 text-white py-4 px-6 flex items-center justify-between gap-3">
        <span className="flex gap-3">
          <Dumbbell size={26} />
          <h1 className="text-lg font-semibold">
            FitGenius – AI Fitness Coach
          </h1>
        </span>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          {/* dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setdropdownOpen(!dropdownOpen)}
              className="cursor-pointer inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
            >
              Tracker
            </button>

            {/* Dropdown content */}
            {dropdownOpen && (
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
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
        {/* Mobile Hamburger Button 
         {menuOpen ? <X size={28} /> : <Menu size={28} />}
        */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Mobile Slide Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-red shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 text-white text-lg bg-blue-300 ">
          <button
            className="self-end cursor-pointer mb-2"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="mobile-item"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="mobile-item"
          >
            About
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="mobile-item"
          >
            Dashboard
          </Link>

          {/* Mobile Dropdown */}
          <details className="bg-gray-800 p-3 rounded-lg">
            <summary className="cursor-pointer">Tracker</summary>
            <div className="flex flex-col mt-2 pl-3 gap-2">
              <Link to="/workouts" onClick={() => setMenuOpen(false)}>
                Workouts
              </Link>
              <Link to="/calories" onClick={() => setMenuOpen(false)}>
                Calories
              </Link>
              <Link to="/weightlog" onClick={() => setMenuOpen(false)}>
                Weight Log
              </Link>
              <Link to="/goals" onClick={() => setMenuOpen(false)}>
                Goals
              </Link>
            </div>
          </details>

          {token ? (
            <button
              onClick={() => {
                logout()
                setMenuOpen(false)
              }}
              className="text-red-400"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mobile-item text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
