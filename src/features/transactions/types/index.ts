export type { RiskLevel, TransactionStatus } from "@/shared/schemas/transaction"
import type { RiskLevel, TransactionStatus } from "@/shared/schemas/transaction"
export type TimelineEventType = "status" | "risk" | "system"

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

export interface TransactionCustomer {
  id: string
  name: string
  email: string
  phone: string
  totalTransactions: number
  accountSince: string
}

export interface TransactionRiskIndicator {
  id: string
  label: string
  severity: RiskLevel
  description: string
}

export interface TransactionTimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string
  type: TimelineEventType
}

export interface TransactionDetail extends Transaction {
  customer: TransactionCustomer
  history: Transaction[]
  riskIndicators: TransactionRiskIndicator[]
  timeline: TransactionTimelineEvent[]
}

export interface PaginatedTransactions {
  items: Transaction[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
