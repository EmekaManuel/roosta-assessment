import axios from "axios"
import { TOKEN_KEY } from "@/features/auth/lib/constants"

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
})

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      void import("@/features/auth/store/auth-store").then(({ useAuthStore }) => {
        useAuthStore.getState().logout()
        window.location.href = "/login"
      })
    }
    return Promise.reject(err)
  }
)
