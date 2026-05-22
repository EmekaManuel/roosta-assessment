"use client"

import { Radio } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { formatDate } from "@/shared/lib/formatters"

interface LiveFeedStatusProps {
  isActive: boolean
  lastUpdatedAt: Date | null
  compact?: boolean
  className?: string
}

export function LiveFeedStatus({
  isActive,
  lastUpdatedAt,
  compact = false,
  className,
}: LiveFeedStatusProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground",
        compact ? "px-2 py-1" : "px-3 py-1.5",
        className
      )}
      title={
        lastUpdatedAt
          ? `Last sync: ${formatDate(lastUpdatedAt)}`
          : "Connecting to live feed…"
      }
    >
      <span className="relative flex size-2">
        {isActive && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            isActive ? "bg-emerald-500" : "bg-muted-foreground/40"
          )}
        />
      </span>
      {!compact ? <Radio className="size-3.5 shrink-0" /> : null}
      <span className="font-medium">{isActive ? "Live" : "Off"}</span>
    </div>
  )
}
