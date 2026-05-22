"use client"

import { useEffect } from "react"
import { useAuthStore } from "../store/auth-store"

interface AuthHydratorProps {
  children: React.ReactNode
}

/** Restores auth state from storage and loads the session on the client. */
export function AuthHydrator({ children }: AuthHydratorProps) {
  const hydrate = useAuthStore((s) => s.hydrate)
  const fetchSession = useAuthStore((s) => s.fetchSession)

  useEffect(() => {
    hydrate()
    void fetchSession()
  }, [hydrate, fetchSession])

  return <>{children}</>
}
