"use client"

import { ArrowLeftRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { EmptyState } from "@/shared/components/feedback/EmptyState"
import { TablePagination } from "@/shared/components/data/TablePagination"
import { formatCurrency, formatDate } from "@/shared/lib/formatters"
import { TransactionStatusBadge } from "./TransactionStatusBadge"
import { RiskLevelBadge } from "./RiskLevelBadge"
import type { Transaction } from "../types"

interface TransactionsTableProps {
  transactions: Transaction[]
  isLoading: boolean
  page: number
  totalPages: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
  onViewDetail: (id: string) => void
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 5 }).map((__, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export function TransactionsTable({
  transactions,
  isLoading,
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onViewDetail,
}: TransactionsTableProps) {
  if (!isLoading && transactions.length === 0) {
    return (
      <EmptyState
        icon={ArrowLeftRight}
        title="No transactions found"
        description="Try adjusting your search or filters."
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="font-semibold">Customer Name</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Risk Level</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              transactions.map((txn, index) => (
                <TableRow
                  key={txn.id}
                  className="cursor-pointer hover:bg-muted/30 transition-colors duration-200 animate-in fade-in slide-in-from-left-1 fill-mode-both"
                  style={{ animationDelay: `${index * 40}ms`, animationDuration: "350ms" }}
                  onClick={() => onViewDetail(txn.id)}
                >
                  <TableCell>
                    <p className="font-medium text-sm text-foreground">{txn.customerName}</p>
                    <p className="text-xs text-muted-foreground font-mono">{txn.reference}</p>
                  </TableCell>
                  <TableCell className="font-medium tabular-nums">
                    {formatCurrency(txn.amount)}
                  </TableCell>
                  <TableCell>
                    <RiskLevelBadge level={txn.riskLevel} />
                  </TableCell>
                  <TableCell>
                    <TransactionStatusBadge status={txn.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(txn.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && total > 0 && (
        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
