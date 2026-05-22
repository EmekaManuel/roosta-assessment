"use client"

import { useAuthStore } from "../store/auth-store"

export { getStoredToken } from "../store/auth-store"

export function useSession() {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const isHydrated = useAuthStore((s) => s.isHydrated)
  const fetchSession = useAuthStore((s) => s.fetchSession)

  return {
    user,
    isLoading: !isHydrated || isLoading,
    isHydrated,
    refetch: fetchSession,
  }
}
