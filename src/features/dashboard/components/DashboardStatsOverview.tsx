"use client"

import {
  ArrowLeftRight,
  AlertTriangle,
  Users,
  ShieldAlert,
} from "lucide-react"
import { StatCard } from "@/shared/components/data/StatCard"
import { QueryErrorState } from "@/shared/components/feedback/QueryErrorState"
import { StatCardsSkeleton } from "./StatCardsSkeleton"
import { useDashboardSummary } from "../api/queries"

interface DashboardStatsOverviewProps {
  businessId: string
}

export function DashboardStatsOverview({ businessId }: DashboardStatsOverviewProps) {
  const { data: summary, isLoading, isError, refetch } = useDashboardSummary(businessId)

  if (!businessId) return null

  if (isError) {
    return <QueryErrorState onRetry={() => void refetch()} />
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCardsSkeleton count={4} />
      </div>
    )
  }

  if (!summary) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Transactions"
        value={summary.totalTransactions.toLocaleString("en-NG")}
        icon={ArrowLeftRight}
        trend={{ value: 6.4, label: "vs last month" }}
      />
      <StatCard
        label="Flagged Transactions"
        value={summary.flaggedTransactions.toLocaleString("en-NG")}
        icon={AlertTriangle}
        trend={{ value: -2.1, label: "vs last month" }}
      />
      <StatCard
        label="Total Customers"
        value={summary.totalCustomers.toLocaleString("en-NG")}
        icon={Users}
        trend={{ value: 3.8, label: "vs last month" }}
      />
      <StatCard
        label="Risk Score"
        value={`${summary.riskScore}/100`}
        icon={ShieldAlert}
        trend={{ value: summary.riskTrend, label: "vs last month" }}
      />
    </div>
  )
}
