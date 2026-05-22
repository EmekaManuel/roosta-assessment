import axios from "axios"
import { API_BASE_URL, TOKEN_KEY } from "@/shared/lib/constants"

export const apiClient = axios.create({
  baseURL: API_BASE_URL || undefined,
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
      void import("@/shared/store/business-store").then(({ useBusinessStore }) => {
        useBusinessStore.getState().clearBusiness()
      })
      void import("@/features/auth/store/auth-store").then(({ useAuthStore }) => {
        useAuthStore.getState().logout()
        window.location.href = "/login"
      })
    }
    return Promise.reject(err)
  }
)
