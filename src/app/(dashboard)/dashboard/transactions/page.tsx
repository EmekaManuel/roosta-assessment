import type { Metadata } from "next"
import { TransactionsDashboard } from "@/features/transactions"

export const metadata: Metadata = {
  title: "Transactions | Roosta",
  description: "View and manage all transactions with risk monitoring.",
}

export default function TransactionsPage() {
  return <TransactionsDashboard />
}
