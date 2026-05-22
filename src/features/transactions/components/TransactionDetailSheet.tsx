"use client"

import {
  Phone,
  Mail,
  ShieldAlert,
  History,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Flag,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Separator } from "@/shared/components/ui/separator"
import { formatCurrency, formatDate } from "@/shared/lib/formatters"
import { cn } from "@/shared/lib/utils"
import { useTransaction } from "../api/queries"
import { QueryErrorState } from "@/shared/components/feedback/QueryErrorState"
import { TransactionStatusBadge } from "@/shared/components/data/TransactionStatusBadge"
import { RiskLevelBadge } from "@/shared/components/data/RiskLevelBadge"
import type { TransactionTimelineEvent, TransactionRiskIndicator } from "../types"

interface TransactionDetailSheetProps {
  transactionId: string | null
  onOpenChange: (open: boolean) => void
}

function DetailSkeleton() {
  return (
    <div className="px-6 pt-6 space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-lg" />
      ))}
    </div>
  )
}

const timelineIcon: Record<TransactionTimelineEvent["type"], typeof Clock> = {
  status: CheckCircle2,
  risk: AlertTriangle,
  system: Clock,
}

function RiskIndicatorItem({ indicator }: { indicator: TransactionRiskIndicator }) {
  const severityStyles = {
    low: "border-emerald-500/30 bg-emerald-500/5",
    medium: "border-orange-500/30 bg-orange-500/5",
    high: "border-destructive/30 bg-destructive/5",
  }

  return (
    <div className={cn("rounded-lg border p-3", severityStyles[indicator.severity])}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-sm font-medium text-foreground">{indicator.label}</p>
        <RiskLevelBadge level={indicator.severity} />
      </div>
      <p className="text-xs text-muted-foreground">{indicator.description}</p>
    </div>
  )
}

export function TransactionDetailSheet({
  transactionId,
  onOpenChange,
}: TransactionDetailSheetProps) {
  const { data: detail, isLoading, isError, refetch } = useTransaction(transactionId ?? "")
  const isOpen = !!transactionId

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[520px] overflow-y-auto px-0 pb-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-5 border-b border-border/60 shrink-0">
          <SheetTitle className="flex items-center justify-between gap-3 pr-8 text-xl font-semibold tracking-tight">
            Transaction Details
            {detail && <TransactionStatusBadge status={detail.status} />}
          </SheetTitle>
          {detail && (
            <p className="text-sm text-muted-foreground font-mono">{detail.reference}</p>
          )}
        </SheetHeader>

        {isLoading && <DetailSkeleton />}

        {isError && !isLoading && (
          <div className="px-6 py-6">
            <QueryErrorState onRetry={() => void refetch()} />
          </div>
        )}

        {!isLoading && !isError && !detail && transactionId && (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            Transaction not found.
          </div>
        )}

        {detail && (
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-6 space-y-6">
              {/* Customer details */}
              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3">
                  Customer details
                </p>
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11 shrink-0">
                      <AvatarFallback className="bg-primary/15 text-primary font-semibold text-sm">
                        {detail.customer.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{detail.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{detail.customer.id}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="size-3.5 shrink-0" />
                      <span>{detail.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-3.5 shrink-0" />
                      <span>{detail.customer.phone}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-border/50">
                    <span className="text-muted-foreground">Total transactions</span>
                    <span className="font-medium text-foreground">
                      {detail.customer.totalTransactions}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Customer since</span>
                    <span className="font-medium text-foreground">
                      {formatDate(detail.customer.accountSince)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Current transaction summary */}
              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3">
                  This transaction
                </p>
                <div className="rounded-xl border border-border bg-muted/30 p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold tabular-nums">{formatCurrency(detail.amount)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(detail.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskLevelBadge level={detail.riskLevel} />
                    {detail.isFlagged && (
                      <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-medium">
                        <Flag className="size-3.5 fill-orange-500/30" />
                        Flagged
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Risk indicators */}
              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3 flex items-center gap-1.5">
                  <ShieldAlert className="size-3.5" />
                  Risk indicators
                </p>
                <div className="space-y-2">
                  {detail.riskIndicators.map((indicator) => (
                    <RiskIndicatorItem key={indicator.id} indicator={indicator} />
                  ))}
                </div>
              </section>

              {/* Transaction history */}
              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3 flex items-center gap-1.5">
                  <History className="size-3.5" />
                  Transaction history
                </p>
                {detail.history.length === 0 ? (
                  <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border p-4 text-center">
                    No prior transactions for this customer.
                  </p>
                ) : (
                  <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
                    {detail.history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-muted/30"
                      >
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-muted-foreground">{item.reference}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                        <div className="text-right shrink-0 space-y-1">
                          <p className="font-medium tabular-nums">{formatCurrency(item.amount)}</p>
                          <TransactionStatusBadge status={item.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <Separator />

              {/* Timeline / activity */}
              <section>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3">
                  Activity timeline
                </p>
                <ol className="relative border-l border-border ml-2 space-y-5 pl-6">
                  {detail.timeline.map((event) => {
                    const Icon = timelineIcon[event.type]
                    return (
                      <li key={event.id} className="relative">
                        <span className="absolute -left-[29px] flex size-6 items-center justify-center rounded-full bg-muted border border-border">
                          <Icon className="size-3 text-muted-foreground" />
                        </span>
                        <p className="text-sm font-medium text-foreground">{event.title}</p>
                        {event.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground/80 mt-1">
                          {formatDate(event.timestamp)}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </section>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
