"use client"

import { useState } from "react"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { AnimatedSection } from "@/shared/components/feedback/AnimatedSection"
import { TransactionFilterBar } from "./TransactionFilterBar"
import { TransactionsTable } from "./TransactionsTable"
import { TransactionDetailSheet } from "./TransactionDetailSheet"
import { useTransactions } from "../api/queries"
import { useTransactionUrlState } from "../hooks/useTransactionUrlState"

const BUSINESS_ID = "biz-1"

export function TransactionsDashboard() {
  const { filters, page, setFilters, setPage, setSearchQuery } = useTransactionUrlState()
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)

  const { data, isPending, isFetching } = useTransactions(BUSINESS_ID, filters, page)

  const transactions = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0
  const pageSize = data?.pageSize ?? 8
  const currentPage = data?.page ?? page

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Transactions"
          description="Search, filter, and review all transactions with risk insights."
        />
      </AnimatedSection>

      <AnimatedSection delayMs={80}>
      <TransactionFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onSearchQueryChange={setSearchQuery}
      />
      </AnimatedSection>

      <AnimatedSection delayMs={160}>
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
      </AnimatedSection>

      <TransactionDetailSheet
        transactionId={selectedTransactionId}
        onOpenChange={(open) => {
          if (!open) setSelectedTransactionId(null)
        }}
      />
    </div>
  )
}
