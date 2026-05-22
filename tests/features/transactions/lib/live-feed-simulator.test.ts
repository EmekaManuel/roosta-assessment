import { describe, expect, it, beforeEach } from "vitest"
import type { Transaction } from "@/features/transactions/types"
import {
  resetLiveFeedSimulator,
  simulateLiveFeedTick,
} from "@/features/transactions/lib/live-feed-simulator"

const baseTxn: Transaction = {
  id: "txn-base",
  reference: "TXN-BASE",
  customerName: "Test User",
  customerId: "cust-0",
  amount: 10000,
  status: "pending",
  isFlagged: false,
  riskLevel: "low",
  createdAt: "2026-05-22T00:00:00Z",
}

describe("simulateLiveFeedTick", () => {
  beforeEach(() => {
    resetLiveFeedSimulator()
  })

  it("can prepend a new transaction", () => {
    const list = [baseTxn]
    let added = false

    for (let i = 0; i < 30 && !added; i += 1) {
      const event = simulateLiveFeedTick(list)
      if (event?.type === "new_transaction" || event?.type === "flagged") {
        added = true
        expect(list.length).toBeGreaterThan(1)
      }
    }

    expect(added).toBe(true)
  })

  it("returns null for empty list", () => {
    expect(simulateLiveFeedTick([])).toBeNull()
  })
})
