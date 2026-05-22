"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "../store/auth-store"

const PUBLIC_AUTH_PATHS = ["/login", "/signup", "/forgot-password"]

interface GuestGuardProps {
  children: React.ReactNode
}

/** Redirects authenticated users away from login/signup to dashboard or onboarding. */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isHydrated = useAuthStore((s) => s.isHydrated)
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)

  const isGuestRoute = PUBLIC_AUTH_PATHS.includes(pathname)

  useEffect(() => {
    if (!isGuestRoute || !isHydrated) return
    if (!token) return
    if (isLoading) return
    if (!user) return

    if (user.onboardingComplete === false) {
      router.replace("/onboarding")
      return
    }
    router.replace("/dashboard")
  }, [isGuestRoute, isHydrated, token, user, isLoading, router])

  if (!isGuestRoute) {
    return <>{children}</>
  }

  if (!isHydrated || (token && (isLoading || user))) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    )
  }

  if (token && user) {
    return null
  }

  return <>{children}</>
}
