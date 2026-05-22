"use client"

import { Sidebar } from "@/shared/components/layout/Sidebar"
import { TopBar } from "@/shared/components/layout/TopBar"
import { useLiveTransactionPolling } from "@/features/transactions/hooks/useLiveTransactionPolling"

const BUSINESS_ID = "biz-1"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { isActive, lastUpdatedAt } = useLiveTransactionPolling({
    businessId: BUSINESS_ID,
  })

  return (
    <div className="fixed inset-0 flex h-screen w-screen bg-background overflow-hidden">
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden">
        <TopBar
          businessName="My Salon"
          liveFeedActive={isActive}
          liveFeedUpdatedAt={lastUpdatedAt}
        />
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
