export type RiskLevel = "low" | "medium" | "high"

export type TransactionStatus = "completed" | "pending" | "failed"

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
