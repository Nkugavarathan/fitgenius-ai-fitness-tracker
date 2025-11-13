// export default function About() {
//   return (
//     <div className="min-h-screen bg-blue-50  py-12 px-6 space-y-8">
//       <h1 className="text-3xl font-bold text-blue-600 text-center">
//         About FitGenius
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-6">
//         {/* Mission Card */}
//         <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl text-center">
//           <h2 className="text-xl font-semibold text-blue-500 mb-3">
//             Our Mission
//           </h2>
//           <p className="text-gray-700">
//             FitGenius empowers individuals to take control of their health and
//             fitness by combining technology, simplicity, and motivation. We
//             believe fitness should be accessible, personalized, and inspiring
//             for everyone.
//           </p>
//         </div>
//         {/* AI Support Card */}
//         <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl text-center">
//           <h2 className="text-xl font-semibold text-blue-500 mb-3">
//             AI-Powered Tracking
//           </h2>
//           <p className="text-gray-700">
//             FitGenius uses AI to analyze your workouts, suggest improvements,
//             and build routines that fit your lifestyle. Think of it as having a
//             personal coach in your pocket.
//           </p>
//         </div>
//         {/* Features Card */}
//         <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl text-center">
//           <h2 className="text-xl font-semibold text-blue-500 mb-3">
//             Key Features
//           </h2>
//           <ul className="text-gray-700 space-y-2">
//             <li>📊 Track exercises, sets, and reps</li>
//             <li>📅 Log workouts by date</li>
//             <li>📈 Visualize progress over time</li>
//             <li>🤖 Get AI-driven insights and suggestions</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          About <span className="text-blue-600">FitGenius</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          We're revolutionizing fitness through artificial intelligence, making
          personalized coaching accessible to everyone. Our mission is to
          transform how people approach health and wellness.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
            <div className="text-gray-600">Workouts Logged</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">User Satisfaction</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Support</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Mission Card - Enhanced */}
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-50">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              FitGenius empowers individuals to take control of their health and
              fitness by combining cutting-edge technology, simplicity, and
              motivation. We believe fitness should be accessible, personalized,
              and inspiring for everyone, regardless of their starting point.
            </p>
          </div>

          {/* AI Support Card - Enhanced */}
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-50">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              AI-Powered Intelligence
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              FitGenius uses advanced machine learning algorithms to analyze
              your workouts, suggest real-time improvements, and build adaptive
              routines that evolve with your lifestyle. Experience having a
              personal coach who learns your strengths and weaknesses.
            </p>
          </div>

          {/* Features Card - Enhanced */}
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-50">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Comprehensive Features
            </h2>
            <ul className="text-gray-700 space-y-3 text-left">
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">📊</span>
                <span>Advanced exercise tracking with form analysis</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">📅</span>
                <span>Smart workout scheduling and reminders</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">📈</span>
                <span>Detailed progress visualization and analytics</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">🤖</span>
                <span>AI-driven personalized recommendations</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">💪</span>
                <span>Custom workout plans based on your goals</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-500">🏆</span>
                <span>Achievement system and milestone tracking</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-blue-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                FitGenius was born from a simple observation: most people
                struggle to maintain consistent fitness routines not because
                they lack motivation, but because they lack personalized
                guidance and clear progress tracking.
              </p>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Our team of fitness experts, data scientists, and software
                engineers came together to create a solution that combines the
                best of human expertise with artificial intelligence.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we're proud to serve a diverse community of fitness
                enthusiasts, from beginners taking their first steps to
                professional athletes optimizing their performance.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="FitGenius Team"
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Innovation
            </h3>
            <p className="text-gray-600">
              Constantly pushing boundaries in fitness technology
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Community
            </h3>
            <p className="text-gray-600">
              Building a supportive fitness community
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Excellence
            </h3>
            <p className="text-gray-600">
              Delivering exceptional user experiences
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Security
            </h3>
            <p className="text-gray-600">
              Protecting your data with enterprise-grade security
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their lives with
            FitGenius
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Start Free Trial
            </a>
            <a
              href="/features"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
