"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { TRANSACTIONS_PAGE_SIZE, type TransactionFilter } from "../schemas"
import type { PaginatedTransactions, TransactionDetail } from "../types"
import { filterTransactions, paginateTransactions } from "../lib/filter-transactions"
import { getMutableTransactions, getTransactionDetail } from "./dummy"

function mockDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
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
      const filtered = filterTransactions(getMutableTransactions(), filters)
      return paginateTransactions(filtered, page, TRANSACTIONS_PAGE_SIZE)
    },
    staleTime: 1000 * 30,
    enabled: !!businessId,
    placeholderData: (prev) => prev,
    refetchInterval: 1000 * 30,
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
