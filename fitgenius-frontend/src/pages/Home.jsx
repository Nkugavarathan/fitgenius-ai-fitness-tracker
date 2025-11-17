import { useContext } from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section*/}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Fitness background"
            className="w-full h-full object-cover"
          />

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Transform Your Fitness Journey{" "}
            <span className="text-blue-400">💪</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            FitGenius combines AI technology with expert coaching to help you
            achieve your fitness goals faster and smarter.
          </p>
          <div className="mt-10">
            <a
              href="/workouts"
              className="cursor-pointer px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
            >
              Start Your Journey Today
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Image and Text */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Fitness tracking app"
                  className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-70"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:pl-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Smart Fitness Management{" "}
                <span className="text-blue-500">Made Simple</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                FitGenius revolutionizes how you approach fitness with
                intelligent tracking, personalized recommendations, and progress
                analytics that actually make sense.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      AI-Powered Workouts
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Get personalized exercise routines that adapt to your
                      progress and goals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Progress Analytics
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Visualize your improvements with detailed charts and
                      insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Nutrition Tracking
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Monitor your diet and get meal suggestions based on your
                      fitness goals.
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-10 ">
                <a
                  href="/features"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
                >
                  Explore All Features
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Trusted by Fitness Leaders
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We partner with top fitness brands and professionals to bring you
              the best experience
            </p>
          </div>

          {/* Scrolling Logos */}
          <div className="relative overflow-hidden py-4">
            <div className="flex space-x-12 animate-scroll">
              {/* Duplicate set for continuous scrolling */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex space-x-12 flex-shrink-0">
                  {/* Brand 1 */}
                  <div className="flex items-center justify-center h-16 w-40">
                    <div className="text-2xl font-bold text-blue-600">
                      GYMPRO
                    </div>
                  </div>

                  {/* Brand 2 */}
                  <div className="flex items-center justify-center h-16 w-40">
                    <div className="text-2xl font-bold text-blue-600">
                      FITNESS+
                    </div>
                  </div>

                  {/* Brand 3 */}
                  <div className="flex items-center justify-center h-16 w-40">
                    <div className="text-2xl font-bold text-blue-600">
                      TRAINWELL
                    </div>
                  </div>

                  {/* Brand 4 */}
                  <div className="flex items-center justify-center h-16 w-40">
                    <div className="text-2xl font-bold text-blue-600">
                      ACTIVELIFE
                    </div>
                  </div>

                  {/* Brand 5 */}
                  <div className="flex items-center justify-center h-16 w-40">
                    <div className="text-2xl font-bold text-blue-600">
                      STRONGMIND
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">
              What Our Users Say
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Real stories from people who transformed their fitness journey
              with FitGenius
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Varathan"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Varathan</h4>
                  <p className="text-blue-600 text-sm">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "FitGenius completely changed how I approach my workouts. The AI
                recommendations are spot on, and I've seen more progress in 3
                months than in the previous year!"
              </p>
              <div className="flex text-yellow-400 mt-4">{"★".repeat(5)}</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Reginold"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Reginold</h4>
                  <p className="text-blue-600 text-sm">Personal Trainer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a trainer, I recommend FitGenius to all my clients. The
                progress tracking and AI insights help them stay motivated
                between our sessions."
              </p>
              <div className="flex text-yellow-400 mt-4">{"★".repeat(5)}</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Abi"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Abi</h4>
                  <p className="text-blue-600 text-sm">Yoga Instructor</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The mindfulness and recovery features in FitGenius are
                incredible. It's not just about intense workouts but holistic
                wellness. Love this app!"
              </p>
              <div className="flex text-yellow-400 mt-4">{"★".repeat(5)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of
            AI-driven fitness with FitGenius.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/login"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Start Free Trial
            </a>
            <a
              href="/"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </section>
      {/* AI chatbot icon */}

      <Link to="/chatbot">
        {/* <button className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group hover:shadow-xl"> */}
        <button
          className="fixed bottom-6 right-6 z-50 w-16 h-16 
  bg-gradient-to-r from-blue-500 to-blue-600 
  rounded-full shadow-2xl flex items-center justify-center 
  hover:scale-110 transition-all duration-300 group hover:shadow-xl animate-bounce"
        >
          <div className="relative">
            <span className="text-white text-2xl">🤖</span>
            <div className="absolute -top-1 -right-1 w-10 h-10 bg-blue-200  opacity-10 rounded-full "></div>
          </div>

          {/* Tooltip */}
          <div className="absolute right-20 bottom-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
            Chat with AI
          </div>
        </button>
      </Link>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
