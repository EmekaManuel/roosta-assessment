"use client"

import { Radio } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { formatDate } from "@/shared/lib/formatters"

interface LiveFeedStatusProps {
  isActive: boolean
  lastUpdatedAt: Date | null
  className?: string
}

export function LiveFeedStatus({ isActive, lastUpdatedAt, className }: LiveFeedStatusProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground",
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
      <Radio className="size-3.5 shrink-0" />
      <span className="font-medium">{isActive ? "Live" : "Offline"}</span>
    </div>
  )
}
