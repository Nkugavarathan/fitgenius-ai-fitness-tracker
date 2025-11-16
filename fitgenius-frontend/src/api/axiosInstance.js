import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
})

// Attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]
}
export default api
