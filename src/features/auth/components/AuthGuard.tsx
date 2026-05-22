"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../store/auth-store"

interface AuthGuardProps {
  children: React.ReactNode
  /** If true, redirect to onboarding when user has not completed it. Default true. */
  requireOnboarding?: boolean
}

export function AuthGuard({ children, requireOnboarding = true }: AuthGuardProps) {
  const router = useRouter()
  const isHydrated = useAuthStore((s) => s.isHydrated)
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)

  useEffect(() => {
    if (!isHydrated) return
    if (!token) {
      router.replace("/login")
      return
    }
    if (isLoading) return
    if (!user) {
      router.replace("/login")
      return
    }
    if (requireOnboarding && user.onboardingComplete === false) {
      router.replace("/onboarding")
    }
  }, [isHydrated, token, user, isLoading, requireOnboarding, router])

  if (!isHydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    )
  }

  if (requireOnboarding && user.onboardingComplete === false) {
    return null
  }

  return <>{children}</>
}
