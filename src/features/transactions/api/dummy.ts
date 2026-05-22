import type {
  Transaction,
  TransactionDetail,
  TransactionCustomer,
  TransactionRiskIndicator,
  TransactionTimelineEvent,
} from "../types"

export const MOCK_TRANSACTIONS: Transaction[] = [
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
  {
    id: "txn-9",
    reference: "TXN-4H2K11",
    customerName: "Blessing Okafor",
    customerId: "cust-109",
    amount: 54000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-19T09:20:00Z",
  },
  {
    id: "txn-10",
    reference: "TXN-8J5L66",
    customerName: "Yusuf Ahmed",
    customerId: "cust-110",
    amount: 98000,
    status: "pending",
    isFlagged: true,
    riskLevel: "high",
    createdAt: "2026-05-18T17:45:00Z",
  },
  {
    id: "txn-11",
    reference: "TXN-2M9N33",
    customerName: "Adaobi Chukwu",
    customerId: "cust-111",
    amount: 27500,
    status: "failed",
    isFlagged: false,
    riskLevel: "medium",
    createdAt: "2026-05-18T12:10:00Z",
  },
  {
    id: "txn-12",
    reference: "TXN-7P1Q88",
    customerName: "Kemi Adebayo",
    customerId: "cust-112",
    amount: 142000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-17T20:30:00Z",
  },
  {
    id: "txn-13",
    reference: "TXN-3R4S22",
    customerName: "Chidi Nwosu",
    customerId: "cust-102",
    amount: 67000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-16T14:00:00Z",
  },
  {
    id: "txn-14",
    reference: "TXN-9T6U44",
    customerName: "Amaka Obi",
    customerId: "cust-101",
    amount: 31000,
    status: "completed",
    isFlagged: false,
    riskLevel: "low",
    createdAt: "2026-05-15T11:15:00Z",
  },
  {
    id: "txn-15",
    reference: "TXN-1V8W77",
    customerName: "Emeka Johnson",
    customerId: "cust-104",
    amount: 198000,
    status: "pending",
    isFlagged: true,
    riskLevel: "high",
    createdAt: "2026-05-14T08:40:00Z",
  },
]

const CUSTOMER_PROFILES: Record<string, TransactionCustomer> = {
  "cust-101": {
    id: "cust-101",
    name: "Amaka Obi",
    email: "amaka.obi@email.com",
    phone: "08031234567",
    totalTransactions: 24,
    accountSince: "2024-03-12T00:00:00Z",
  },
  "cust-102": {
    id: "cust-102",
    name: "Chidi Nwosu",
    email: "chidi.nwosu@email.com",
    phone: "08098765432",
    totalTransactions: 18,
    accountSince: "2024-06-01T00:00:00Z",
  },
  "cust-104": {
    id: "cust-104",
    name: "Emeka Johnson",
    email: "emeka.j@email.com",
    phone: "08123456789",
    totalTransactions: 31,
    accountSince: "2023-11-20T00:00:00Z",
  },
}

function defaultCustomer(txn: Transaction): TransactionCustomer {
  return (
    CUSTOMER_PROFILES[txn.customerId] ?? {
      id: txn.customerId,
      name: txn.customerName,
      email: `${txn.customerName.toLowerCase().replace(/\s+/g, ".")}@email.com`,
      phone: "08000000000",
      totalTransactions: 5,
      accountSince: "2025-01-01T00:00:00Z",
    }
  )
}

function buildRiskIndicators(txn: Transaction): TransactionRiskIndicator[] {
  const indicators: TransactionRiskIndicator[] = []

  if (txn.isFlagged) {
    indicators.push({
      id: "flag-1",
      label: "Manual flag",
      severity: "high",
      description: "Transaction flagged for manual review by compliance team.",
    })
  }

  if (txn.amount >= 100000) {
    indicators.push({
      id: "amount-1",
      label: "High value",
      severity: txn.amount >= 200000 ? "high" : "medium",
      description: "Amount exceeds typical threshold for this customer segment.",
    })
  }

  if (txn.status === "failed") {
    indicators.push({
      id: "status-1",
      label: "Failed payment",
      severity: "medium",
      description: "Payment attempt did not complete successfully.",
    })
  }

  if (txn.riskLevel === "high") {
    indicators.push({
      id: "score-1",
      label: "Elevated risk score",
      severity: "high",
      description: "Composite risk score places this customer in the high-risk band.",
    })
  }

  if (indicators.length === 0) {
    indicators.push({
      id: "clear-1",
      label: "No active alerts",
      severity: "low",
      description: "No risk indicators triggered for this transaction.",
    })
  }

  return indicators
}

function buildTimeline(txn: Transaction): TransactionTimelineEvent[] {
  const events: TransactionTimelineEvent[] = [
    {
      id: "tl-1",
      title: "Transaction initiated",
      description: `Reference ${txn.reference} created`,
      timestamp: txn.createdAt,
      type: "system",
    },
  ]

  if (txn.isFlagged) {
    events.push({
      id: "tl-2",
      title: "Flagged for review",
      description: "Automated rules triggered a compliance flag",
      timestamp: txn.createdAt,
      type: "risk",
    })
  }

  if (txn.status === "completed") {
    events.push({
      id: "tl-3",
      title: "Payment completed",
      description: "Funds settled successfully",
      timestamp: txn.createdAt,
      type: "status",
    })
  } else if (txn.status === "failed") {
    events.push({
      id: "tl-3",
      title: "Payment failed",
      description: "Provider returned an error — insufficient funds",
      timestamp: txn.createdAt,
      type: "status",
    })
  } else {
    events.push({
      id: "tl-3",
      title: "Awaiting confirmation",
      description: "Transaction is pending provider response",
      timestamp: txn.createdAt,
      type: "status",
    })
  }

  return events
}

export function getTransactionDetail(id: string): TransactionDetail | null {
  const txn = MOCK_TRANSACTIONS.find((t) => t.id === id)
  if (!txn) return null

  const history = MOCK_TRANSACTIONS.filter(
    (t) => t.customerId === txn.customerId && t.id !== txn.id
  ).slice(0, 5)

  return {
    ...txn,
    customer: defaultCustomer(txn),
    history,
    riskIndicators: buildRiskIndicators(txn),
    timeline: buildTimeline(txn),
  }
}
