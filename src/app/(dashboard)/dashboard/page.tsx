import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { AnimatedSection } from "@/shared/components/feedback/AnimatedSection"
import { Button } from "@/shared/components/ui/button"
import {
  DashboardStatsOverview,
  RiskScoreSummary,
  TransactionTrendChart,
} from "@/features/dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Roosta",
  description: "Transaction overview, risk insights, and customer activity.",
}

const BUSINESS_ID = "biz-1"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection>
        <PageHeader
          title="Dashboard"
          description="Monitor transactions, flagged activity, customers, and risk at a glance."
        />
      </AnimatedSection>

      <AnimatedSection delayMs={80}>
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Overview
          </h2>
          <DashboardStatsOverview businessId={BUSINESS_ID} />
        </section>
      </AnimatedSection>

      <AnimatedSection delayMs={160}>
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Analytics
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TransactionTrendChart businessId={BUSINESS_ID} />
            </div>
            <RiskScoreSummary businessId={BUSINESS_ID} />
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delayMs={240}>
        <section className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Transactions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Search, filter, and review full transaction details.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 shrink-0 transition-transform active:scale-95" asChild>
            <Link href="/dashboard/transactions">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </AnimatedSection>
    </div>
  )
}
