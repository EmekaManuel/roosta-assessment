"use client"

import Link from "next/link"
import { Building2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { EmptyState } from "@/shared/components/feedback/EmptyState"
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner"
import { useActiveBusiness } from "@/shared/hooks/useActiveBusiness"

interface BusinessSetupGateProps {
  children: React.ReactNode
}

export function BusinessSetupGate({ children }: BusinessSetupGateProps) {
  const { isReady, isHydrated } = useActiveBusiness()

  if (!isHydrated) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <LoadingSpinner label="Loading your business…" />
      </div>
    )
  }

  if (!isReady) {
    return (
      <EmptyState
        icon={Building2}
        title="Complete your business setup"
        description="Finish onboarding so your dashboard, transactions, and settings use your real business profile."
        action={
          <Button asChild>
            <Link href="/onboarding">Continue setup</Link>
          </Button>
        }
      />
    )
  }

  return <>{children}</>
}
