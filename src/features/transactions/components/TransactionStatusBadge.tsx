import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"
import type { TransactionStatus } from "../types"

const statusStyles: Record<TransactionStatus, string> = {
  completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  pending: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
}

const statusLabels: Record<TransactionStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
}

interface TransactionStatusBadgeProps {
  status: TransactionStatus
  className?: string
}

export function TransactionStatusBadge({ status, className }: TransactionStatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("font-medium capitalize", statusStyles[status], className)}>
      {statusLabels[status]}
    </Badge>
  )
}
