import React from "react"
import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl max-w-lg">
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          Oops! It looks like you've followed a broken link or entered a URL
          that doesn't exist here.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
