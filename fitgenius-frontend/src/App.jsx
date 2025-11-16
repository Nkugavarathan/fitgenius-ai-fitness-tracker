import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import WorkoutTable from "./pages/WorkoutTable"
import About from "./pages/About"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import Chatbot from "./pages/Chatbot"
export default function App() {
  return (
    <>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workouts" element={<WorkoutTable />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={<Chatbot />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}
