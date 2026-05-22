"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { TRANSACTIONS_PAGE_SIZE, type TransactionFilter } from "../schemas"
import type { PaginatedTransactions, TransactionDetail } from "../types"
import { MOCK_TRANSACTIONS, getTransactionDetail } from "./dummy"

function mockDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function filterTransactions(
  transactions: typeof MOCK_TRANSACTIONS,
  filters: TransactionFilter
) {
  let result = [...transactions]

  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase()
    result = result.filter(
      (t) =>
        t.customerName.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q) ||
        t.customerId.toLowerCase().includes(q)
    )
  }

  if (filters.status) {
    result = result.filter((t) => t.status === filters.status)
  }

  if (filters.riskLevel) {
    result = result.filter((t) => t.riskLevel === filters.riskLevel)
  }

  return result.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function useTransactions(
  businessId: string,
  filters: TransactionFilter,
  page: number
) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS, businessId, filters, page],
    queryFn: async (): Promise<PaginatedTransactions> => {
      await mockDelay(450)
      const filtered = filterTransactions(MOCK_TRANSACTIONS, filters)
      const total = filtered.length
      const totalPages = Math.max(1, Math.ceil(total / TRANSACTIONS_PAGE_SIZE))
      const safePage = Math.min(Math.max(1, page), totalPages)
      const start = (safePage - 1) * TRANSACTIONS_PAGE_SIZE
      const items = filtered.slice(start, start + TRANSACTIONS_PAGE_SIZE)

      return {
        items,
        total,
        page: safePage,
        pageSize: TRANSACTIONS_PAGE_SIZE,
        totalPages,
      }
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!businessId,
    placeholderData: (prev) => prev,
  })
}

export function useTransaction(transactionId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS, "detail", transactionId],
    queryFn: async (): Promise<TransactionDetail | null> => {
      await mockDelay(350)
      return getTransactionDetail(transactionId)
    },
    enabled: !!transactionId,
    staleTime: 1000 * 60 * 2,
  })
}
