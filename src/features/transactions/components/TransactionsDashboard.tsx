"use client"

import { useState } from "react"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { TransactionFilterBar } from "./TransactionFilterBar"
import { TransactionsTable } from "./TransactionsTable"
import { TransactionDetailSheet } from "./TransactionDetailSheet"
import { useTransactions } from "../api/queries"
import type { TransactionFilter } from "../schemas"

const BUSINESS_ID = "biz-1"

export function TransactionsDashboard() {
  const [filters, setFilters] = useState<TransactionFilter>({})
  const [page, setPage] = useState(1)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)

  const { data, isPending, isFetching } = useTransactions(BUSINESS_ID, filters, page)

  const transactions = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0
  const pageSize = data?.pageSize ?? 8
  const currentPage = data?.page ?? page

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Search, filter, and review all transactions with risk insights."
      />

      <TransactionFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onPageReset={() => setPage(1)}
      />

      <TransactionsTable
        transactions={transactions}
        isLoading={isPending || (isFetching && !data)}
        page={currentPage}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        onViewDetail={setSelectedTransactionId}
      />

      <TransactionDetailSheet
        transactionId={selectedTransactionId}
        onOpenChange={(open) => {
          if (!open) setSelectedTransactionId(null)
        }}
      />
    </div>
  )
}
