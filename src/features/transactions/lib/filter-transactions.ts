import type { TransactionFilter } from "../schemas"
import type { Transaction } from "../types"

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilter
): Transaction[] {
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

export function paginateTransactions<T>(
  items: T[],
  page: number,
  pageSize: number
): {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
} {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  }
}
