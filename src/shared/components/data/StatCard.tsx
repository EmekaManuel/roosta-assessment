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
                className
            )}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                {Icon && (
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-4 text-primary" />
                    </div>
                )}
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
            {trend && (
                <p className={cn("text-xs", trend.value >= 0 ? "text-emerald-600" : "text-red-500")}>
                    {trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label}
                </p>
            )}
        </div>
    )
}
