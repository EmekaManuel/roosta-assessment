"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/shared/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { QueryErrorState } from "@/shared/components/feedback/QueryErrorState"
import { useTransactionChart } from "../api/queries"

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "var(--chart-1)",
  },
  flagged: {
    label: "Flagged",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

interface TransactionTrendChartProps {
  businessId: string
}

function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[280px] w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}

export function TransactionTrendChart({ businessId }: TransactionTrendChartProps) {
  const { data: chartData = [], isLoading, isError, refetch } = useTransactionChart(businessId)

  if (!businessId) return null

  if (isError) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <QueryErrorState onRetry={() => void refetch()} />
        </CardContent>
      </Card>
    )
  }

  if (isLoading) return <ChartSkeleton />

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Transaction volume</CardTitle>
        <CardDescription>Daily transactions and flagged count — last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={chartData} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="dayLabel"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="transactions"
              fill="var(--color-transactions)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="flagged"
              fill="var(--color-flagged)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
