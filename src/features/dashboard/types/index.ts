export type { RiskLevel, TransactionStatus } from "@/shared/schemas/transaction"
import type { RiskLevel, TransactionStatus } from "@/shared/schemas/transaction"

export interface DashboardSummary {
  totalTransactions: number
  flaggedTransactions: number
  totalCustomers: number
  riskScore: number
  riskLevel: RiskLevel
  riskTrend: number
}

export interface TransactionChartPoint {
  dayLabel: string
  transactions: number
  flagged: number
}

export interface Transaction {
  id: string
  reference: string
  customerName: string
  customerId: string
  amount: number
  status: TransactionStatus
  isFlagged: boolean
  riskLevel: RiskLevel | null
  createdAt: string
}
