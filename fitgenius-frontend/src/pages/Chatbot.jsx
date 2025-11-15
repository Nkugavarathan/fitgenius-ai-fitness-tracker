import React, { useState } from "react"
import { Send, Sparkles } from "lucide-react"
import api from "../api/axiosInstance.js"

export default function FitnessChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey champ! I'm your AI Fitness Coach. Ask me about workouts, diet, or motivation! 💪🔥",
    },
  ])

  const [input, setInput] = useState("")

  const suggestions = [
    "Give me a 3-day workout plan",
    "How to lose belly fat?",
    "Motivate me for gym",
    "Best diet for muscle gain",
  ]

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])

    const userText = input
    setInput("")

    try {
      const res = await api.post("/ai/chat", { message: userText })
      const aiText = res.data.text || "Sorry, I couldn't generate a response."

      const botMsg = { role: "assistant", content: aiText }
      setMessages((prev) => [...prev, botMsg])
    } catch (error) {
      const botMsg = {
        role: "assistant",
        content: "⚠️ Error: Unable to reach AI service.",
      }
      setMessages((prev) => [...prev, botMsg])
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col py-20">
      {/* Chat area*/}
      <main className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-4 rounded-2xl shadow text-sm md:text-base whitespace-pre-line leading-relaxed backdrop-blur-md transition-all
              ${
                msg.role === "assistant"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
                  : "bg-blue-600 text-white self-end ml-auto"
              }
            `}
          >
            {msg.content}
          </div>
        ))}

        {/* Suggestions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(s)
                sendMessage()
              }}
              className="p-3 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" /> {s}
            </button>
          ))}
        </div>
      </main>

      {/* input */}
      <div className="w-full p-4 bg-white dark:bg-gray-800 flex items-center gap-3 shadow-inner">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask your fitness coach..."
          className="flex-1 p-3 rounded-xl border dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none"
        />

        <button
          onClick={sendMessage}
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white shadow flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
