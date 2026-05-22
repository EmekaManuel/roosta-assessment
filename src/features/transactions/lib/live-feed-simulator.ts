import type { Transaction } from "../types"

export type LiveFeedEventType = "new_transaction" | "status_update" | "flagged"

export interface LiveFeedEvent {
  type: LiveFeedEventType
  transactionId: string
  reference: string
  message: string
  timestamp: string
}

const CUSTOMERS = [
  { name: "Adaobi Chukwu", id: "cust-201" },
  { name: "Yusuf Ahmed", id: "cust-202" },
  { name: "Kemi Adebayo", id: "cust-203" },
  { name: "Blessing Okafor", id: "cust-204" },
]

let tickCounter = 0

function randomId(): string {
  return `txn-live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function randomReference(): string {
  return `TXN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

/** Simulates a WebSocket tick — mutates the in-memory list and returns an event. */
export function simulateLiveFeedTick(transactions: Transaction[]): LiveFeedEvent | null {
  tickCounter += 1

  if (transactions.length === 0) return null

  // ~70% of ticks produce an event
  if (tickCounter % 10 < 3) return null

  const roll = tickCounter % 3

  if (roll === 0) {
    const customer = CUSTOMERS[tickCounter % CUSTOMERS.length]
    const amount = Math.floor(15000 + Math.random() * 180000)
    const isFlagged = amount > 120000
    const txn: Transaction = {
      id: randomId(),
      reference: randomReference(),
      customerName: customer.name,
      customerId: customer.id,
      amount,
      status: "pending",
      isFlagged,
      riskLevel: isFlagged ? "high" : amount > 80000 ? "medium" : "low",
      createdAt: new Date().toISOString(),
    }
    transactions.unshift(txn)

    return {
      type: isFlagged ? "flagged" : "new_transaction",
      transactionId: txn.id,
      reference: txn.reference,
      message: isFlagged
        ? `Flagged transaction ${txn.reference} from ${txn.customerName}`
        : `New transaction ${txn.reference}`,
      timestamp: txn.createdAt,
    }
  }

  const index = tickCounter % transactions.length
  const txn = transactions[index]
  const nextStatus =
    txn.status === "pending" ? "completed" : txn.status === "completed" ? "failed" : "pending"
  transactions[index] = { ...txn, status: nextStatus }

  return {
    type: "status_update",
    transactionId: txn.id,
    reference: txn.reference,
    message: `${txn.reference} marked as ${nextStatus}`,
    timestamp: new Date().toISOString(),
  }
}

export function resetLiveFeedSimulator(): void {
  tickCounter = 0
}
