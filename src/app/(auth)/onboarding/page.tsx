"use client"

import Link from "next/link"
import Image from "next/image"
import { OnboardingWizard, useSession } from "@/features/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"

export default function OnboardingPage() {
  const { user, isLoading, isHydrated } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated || isLoading) return
    if (!user) {
      router.replace("/login")
      return
    }
    if (user.onboardingComplete === true) {
      router.replace("/dashboard")
    }
  }, [user, isLoading, isHydrated, router])

  if (!isHydrated || isLoading || !user) {
    return (
      <div
        className={cn(
          "min-h-screen w-full bg-v3-primary flex items-center justify-center",
          "font-ibm-plex-sans text-v3-secondary"
        )}
      >
        <div className="animate-pulse text-v3-secondary/60">Loading…</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-v3-primary flex flex-col",
        "font-ibm-plex-sans text-v3-secondary"
      )}
    >
      <header className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Roosta home"
        >
          <Image
            src="/app/roosta-logo.svg"
            alt=""
            width={120}
            height={36}
            className="h-8 w-auto"
          />
        </Link>
      </header>
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-12">
        <OnboardingWizard />
      </main>
    </div>
  )
}
