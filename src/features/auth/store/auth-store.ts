"use client"

import { create } from "zustand"
import { apiClient } from "@/shared/lib/api-client"
import { TOKEN_KEY, MOCK_USER_KEY } from "../lib/constants"
import type { AuthUser } from "../types"

function isMockToken(token: string | null): boolean {
  return !!token && token.startsWith("mock-jwt-")
}

function readMockUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(MOCK_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function writeMockUser(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user))
  }
}

function clearMockUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(MOCK_USER_KEY)
  }
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  isHydrated: boolean
  isLoading: boolean
  hydrate: () => void
  setSession: (token: string, user: AuthUser) => void
  setUser: (user: AuthUser) => void
  fetchSession: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isHydrated: false,
  isLoading: false,

  hydrate: () => {
    if (typeof window === "undefined") return
    const token = localStorage.getItem(TOKEN_KEY)
    set({ token, isHydrated: true })
  },

  setSession: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token)
      if (isMockToken(token)) {
        writeMockUser(user)
      }
    }
    set({ token, user, isLoading: false })
  },

  setUser: (user) => {
    const { token } = get()
    if (isMockToken(token)) {
      writeMockUser(user)
    }
    set({ user })
  },

  fetchSession: async () => {
    const { token } = get()
    if (!token) {
      set({ user: null, isLoading: false })
      return
    }

    set({ isLoading: true })

    try {
      if (isMockToken(token)) {
        const mockUser = readMockUser()
        if (!mockUser) {
          get().logout()
          return
        }
        set({ user: mockUser, isLoading: false })
        return
      }

      const user = (await apiClient.get<AuthUser>("/auth/me")) as unknown as AuthUser
      set({ user, isLoading: false })
    } catch {
      get().logout()
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY)
      clearMockUser()
    }
    set({ token: null, user: null, isLoading: false })
  },
}))

export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    return useAuthStore.getState().token ?? localStorage.getItem(TOKEN_KEY)
  }
  return useAuthStore.getState().token
}
