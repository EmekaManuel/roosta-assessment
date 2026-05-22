import { cn } from "@/shared/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: number
    label: string
  }
  className?: string
}

export function StatCard({ label, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 flex flex-col gap-3",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20",
        "active:scale-[0.99]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
            <Icon className="size-4 text-primary transition-transform duration-300" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{value}</p>
      {trend && (
        <p
          className={cn(
            "text-xs transition-colors",
            trend.value >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
          )}
        >
          {trend.value >= 0 ? "+" : ""}
          {trend.value}% {trend.label}
        </p>
      )}
    </div>
  )
}
