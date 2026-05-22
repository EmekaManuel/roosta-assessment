import type { Metadata } from "next"
import { Suspense } from "react"
import { TransactionsDashboard } from "@/features/transactions"
import { Skeleton } from "@/shared/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Transactions | Roosta",
  description: "View and manage all transactions with risk monitoring.",
}

function TransactionsPageFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1 max-w-[300px]" />
        <Skeleton className="h-10 w-[160px]" />
        <Skeleton className="h-10 w-[160px]" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  )
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<TransactionsPageFallback />}>
      <TransactionsDashboard />
    </Suspense>
  )
}
