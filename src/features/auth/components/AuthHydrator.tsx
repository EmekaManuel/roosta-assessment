"use client"

import { useEffect } from "react"
import { useBusinessStore } from "@/shared/store/business-store"
import { useAuthStore } from "../store/auth-store"

interface AuthHydratorProps {
  children: React.ReactNode
}

/** Restores auth state from storage and loads the session on the client. */
export function AuthHydrator({ children }: AuthHydratorProps) {
  const hydrateAuth = useAuthStore((s) => s.hydrate)
  const hydrateBusiness = useBusinessStore((s) => s.hydrate)
  const fetchSession = useAuthStore((s) => s.fetchSession)

  useEffect(() => {
    hydrateAuth()
    hydrateBusiness()
    void fetchSession()
  }, [hydrateAuth, hydrateBusiness, fetchSession])

  return <>{children}</>
}
