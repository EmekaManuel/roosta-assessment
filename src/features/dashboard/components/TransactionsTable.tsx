"use client"

import { ArrowLeftRight, Flag } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { EmptyState } from "@/shared/components/feedback/EmptyState"
import { formatCurrency, formatDate } from "@/shared/lib/formatters"
import { useTransactions } from "../api/queries"
import { TransactionStatusBadge } from "./TransactionStatusBadge"
import { RiskLevelBadge } from "./RiskLevelBadge"

interface TransactionsTableProps {
  businessId: string
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 7 }).map((__, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export function TransactionsTable({ businessId }: TransactionsTableProps) {
  const { data: transactions = [], isLoading } = useTransactions(businessId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent transactions</CardTitle>
        <CardDescription>
          Latest activity with status, risk level, and flag indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-0">
        {!isLoading && transactions.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={ArrowLeftRight}
              title="No transactions yet"
              description="Transactions will appear here once activity starts."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="font-semibold">Reference</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Risk</TableHead>
                  <TableHead className="font-semibold w-16 text-center">Flag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  transactions.map((txn) => (
                    <TableRow
                      key={txn.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {txn.reference}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm text-foreground">{txn.customerName}</p>
                        <p className="text-xs text-muted-foreground">{txn.customerId}</p>
                      </TableCell>
                      <TableCell className="font-medium tabular-nums">
                        {formatCurrency(txn.amount)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(txn.createdAt)}
                      </TableCell>
                      <TableCell>
                        <TransactionStatusBadge status={txn.status} />
                      </TableCell>
                      <TableCell>
                        <RiskLevelBadge level={txn.riskLevel} />
                      </TableCell>
                      <TableCell className="text-center">
                        {txn.isFlagged ? (
                          <Flag
                            className="size-4 text-orange-500 mx-auto fill-orange-500/20"
                            aria-label="Flagged"
                          />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
