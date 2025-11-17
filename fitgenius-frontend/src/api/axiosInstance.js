import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
})

// Attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  // Get month and pad with leading zero if needed (e.g., 01 for January)
  const month = String(today.getMonth() + 1).padStart(2, "0")
  // Get day and pad with leading zero
  const day = String(today.getDate()).padStart(2, "0")

  // This MUST match Java's LocalDate.toString() format (YYYY-MM-DD)
  return `${year}-${month}-${day}`
}
export default api
