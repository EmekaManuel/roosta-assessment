import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"
import type { RiskLevel } from "@/shared/schemas/transaction"

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  medium: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
}

interface RiskLevelBadgeProps {
  level: RiskLevel | null
  className?: string
}

export function RiskLevelBadge({ level, className }: RiskLevelBadgeProps) {
  if (!level) {
    return (
      <Badge variant="outline" className={cn("text-muted-foreground", className)}>
        —
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className={cn("font-medium capitalize", riskStyles[level], className)}>
      {level}
    </Badge>
  )
}
