"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/shared/lib/constants"
import type { DashboardSummary, Transaction, TransactionChartPoint } from "../types"

const MOCK_SUMMARY: DashboardSummary = {
  totalTransactions: 12847,
  flaggedTransactions: 142,
  totalCustomers: 3842,
  riskScore: 68,
  riskLevel: "medium",
  riskTrend: -4.2,
}

const MOCK_CHART: TransactionChartPoint[] = [
  { dayLabel: "Mon", transactions: 420, flagged: 8 },
  { dayLabel: "Tue", transactions: 512, flagged: 12 },
  { dayLabel: "Wed", transactions: 389, flagged: 6 },
  { dayLabel: "Thu", transactions: 601, flagged: 18 },
  { dayLabel: "Fri", transactions: 734, flagged: 22 },
  { dayLabel: "Sat", transactions: 298, flagged: 5 },
  { dayLabel: "Sun", transactions: 201, flagged: 3 },
]

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-1",
    reference: "TXN-8F2A91",
    customerName: "Amaka Obi",
    customerId: "cust-101",
    amount: 45000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-22T09:14:00Z",
  },
  {
    id: "txn-2",
    reference: "TXN-3C7B44",
    customerName: "Chidi Nwosu",
    customerId: "cust-102",
    amount: 125000,
    status: "pending",
    isFlagged: true,
    riskLevel: "high",
    createdAt: "2026-05-22T08:52:00Z",
  },
  {
    id: "txn-3",
    reference: "TXN-9D1E20",
    customerName: "Fatima Bello",
    customerId: "cust-103",
    amount: 18500,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-21T16:30:00Z",
  },
  {
    id: "txn-4",
    reference: "TXN-5A8F33",
    customerName: "Emeka Johnson",
    customerId: "cust-104",
    amount: 89000,
    status: "failed",
    isFlagged: true,
    riskLevel: "medium",
    createdAt: "2026-05-21T14:05:00Z",
  },
  {
    id: "txn-5",
    reference: "TXN-2B6C17",
    customerName: "Grace Adeyemi",
    customerId: "cust-105",
    amount: 32000,
    status: "completed",
    isFlagged: true,
    riskLevel: "medium",
    createdAt: "2026-05-21T11:22:00Z",
  },
  {
    id: "txn-6",
    reference: "TXN-7E4D88",
    customerName: "Ibrahim Musa",
    customerId: "cust-106",
    amount: 156000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-20T18:45:00Z",
  },
  {
    id: "txn-7",
    reference: "TXN-1F9A55",
    customerName: "Ngozi Eze",
    customerId: "cust-107",
    amount: 7200,
    status: "pending",
    isFlagged: false,
    riskLevel: null,
    createdAt: "2026-05-20T10:10:00Z",
  },
  {
    id: "txn-8",
    reference: "TXN-6G3H92",
    customerName: "Tunde Bakare",
    customerId: "cust-108",
    amount: 210000,
    status: "completed",
    isFlagged: true,
    riskLevel: "high",
    createdAt: "2026-05-19T15:33:00Z",
  },
]

function mockDelay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useDashboardSummary(businessId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, "summary", businessId],
    queryFn: async () => {
      await mockDelay()
      return MOCK_SUMMARY
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!businessId,
  })
}

export function useTransactionChart(businessId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, "chart", businessId],
    queryFn: async () => {
      await mockDelay()
      return MOCK_CHART
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!businessId,
  })
}

export function useTransactions(businessId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, "transactions", businessId],
    queryFn: async () => {
      await mockDelay(600)
      return MOCK_TRANSACTIONS
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!businessId,
  })
}
