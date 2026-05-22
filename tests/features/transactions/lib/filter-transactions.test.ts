import { describe, expect, it } from "vitest"
import { filterTransactions, paginateTransactions } from "@/features/transactions/lib/filter-transactions"
import type { Transaction } from "@/features/transactions/types"

const sample: Transaction[] = [
  {
    id: "1",
    reference: "TXN-AAA",
    customerName: "Amaka Obi",
    customerId: "cust-1",
    amount: 1000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-22T10:00:00Z",
  },
  {
    id: "2",
    reference: "TXN-BBB",
    customerName: "Chidi Nwosu",
    customerId: "cust-2",
    amount: 200000,
    status: "pending",
    isFlagged: true,
    riskLevel: "high",
    createdAt: "2026-05-21T10:00:00Z",
  },
  {
    id: "3",
    reference: "TXN-CCC",
    customerName: "Fatima Bello",
    customerId: "cust-3",
    amount: 5000,
    status: "failed",
    isFlagged: false,
    riskLevel: "medium",
    createdAt: "2026-05-20T10:00:00Z",
  },
]

describe("filterTransactions", () => {
  it("filters by search query across name and reference", () => {
    const result = filterTransactions(sample, { search: "amaka" })
    expect(result).toHaveLength(1)
    expect(result[0]?.customerName).toBe("Amaka Obi")
  })

  it("filters by status", () => {
    const result = filterTransactions(sample, { status: "pending" })
    expect(result).toHaveLength(1)
    expect(result[0]?.status).toBe("pending")
  })

  it("filters by risk level", () => {
    const result = filterTransactions(sample, { riskLevel: "high" })
    expect(result).toHaveLength(1)
    expect(result[0]?.riskLevel).toBe("high")
  })

  it("sorts newest first", () => {
    const result = filterTransactions(sample, {})
    expect(result[0]?.id).toBe("1")
    expect(result[2]?.id).toBe("3")
  })
})

describe("paginateTransactions", () => {
  it("returns correct page slice", () => {
    const page = paginateTransactions(sample, 1, 2)
    expect(page.items).toHaveLength(2)
    expect(page.total).toBe(3)
    expect(page.totalPages).toBe(2)
  })

  it("clamps page to valid range", () => {
    const page = paginateTransactions(sample, 99, 2)
    expect(page.page).toBe(2)
    expect(page.items).toHaveLength(1)
  })
})
