"use client"

import { Sidebar } from "@/shared/components/layout/Sidebar"
import { TopBar } from "@/shared/components/layout/TopBar"
import { useActiveBusiness } from "@/shared/hooks/useActiveBusiness"
import { useLiveTransactionPolling } from "@/features/transactions"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { businessId, businessName } = useActiveBusiness()
  const { isActive, lastUpdatedAt } = useLiveTransactionPolling({
    businessId,
    enabled: !!businessId,
  })

  return (
    <div className="fixed inset-0 flex h-screen w-screen bg-background overflow-hidden">
      <div className="hidden md:flex shrink-0">
        <Sidebar businessName={businessName} />
      </div>

      <div className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden">
        <TopBar
          businessName={businessName || "My Business"}
          liveFeedActive={isActive}
          liveFeedUpdatedAt={lastUpdatedAt}
        />
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
