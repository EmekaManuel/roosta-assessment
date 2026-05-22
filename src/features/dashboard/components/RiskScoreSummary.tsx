"use client"

import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"
import { useDashboardSummary } from "../api/queries"
import type { RiskLevel } from "../types"

interface RiskScoreSummaryProps {
  businessId: string
}

const riskConfig: Record<
  RiskLevel,
  { label: string; variant: "default" | "secondary" | "destructive"; icon: typeof Shield; barClass: string }
> = {
  low: {
    label: "Low risk",
    variant: "secondary",
    icon: ShieldCheck,
    barClass: "bg-emerald-500",
  },
  medium: {
    label: "Medium risk",
    variant: "default",
    icon: Shield,
    barClass: "bg-orange-500",
  },
  high: {
    label: "High risk",
    variant: "destructive",
    icon: ShieldAlert,
    barClass: "bg-destructive",
  },
}

function RiskScoreSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

export function RiskScoreSummary({ businessId }: RiskScoreSummaryProps) {
  const { data: summary, isLoading } = useDashboardSummary(businessId)

  if (isLoading) return <RiskScoreSkeleton />
  if (!summary) return null

  const config = riskConfig[summary.riskLevel]
  const Icon = config.icon
  const flaggedRate =
    summary.totalTransactions > 0
      ? ((summary.flaggedTransactions / summary.totalTransactions) * 100).toFixed(1)
      : "0"

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Risk Score Summary</CardTitle>
        <CardDescription>Overall portfolio risk based on transaction patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-bold tracking-tight text-foreground">
              {summary.riskScore}
              <span className="text-lg font-medium text-muted-foreground">/100</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {summary.riskTrend >= 0 ? "+" : ""}
              {summary.riskTrend}% vs last month
            </p>
          </div>
          <Badge variant={config.variant} className="gap-1 shrink-0">
            <Icon className="size-3.5" />
            {config.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Risk level</span>
            <span>{summary.riskScore}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", config.barClass)}
              style={{ width: `${summary.riskScore}%` }}
            />
          </div>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex justify-between">
            <span>Flagged rate</span>
            <span className="font-medium text-foreground">{flaggedRate}%</span>
          </li>
          <li className="flex justify-between">
            <span>Flagged transactions</span>
            <span className="font-medium text-foreground">
              {summary.flaggedTransactions.toLocaleString("en-NG")}
            </span>
          </li>
          <li className="flex justify-between">
            <span>Active customers</span>
            <span className="font-medium text-foreground">
              {summary.totalCustomers.toLocaleString("en-NG")}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
