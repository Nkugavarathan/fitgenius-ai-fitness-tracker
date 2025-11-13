import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
})

export const login = async (email, password) => {
  const res = await axios.post("http://localhost:8080/api/auth/login", {
    email,
    password,
  })

  // Save JWT to localStorage
  localStorage.setItem("token", res.data.token)

  return res.data
}
export default api
