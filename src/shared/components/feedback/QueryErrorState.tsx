"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface QueryErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function QueryErrorState({
  title = "Couldn’t load data",
  description = "Something went wrong. Check your connection and try again.",
  onRetry,
  className,
}: QueryErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/20 bg-destructive/5 py-12 px-6 text-center",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-6 text-destructive" />
      </div>
      <div className="space-y-1 max-w-sm">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" className="gap-2" onClick={() => onRetry()}>
          <RefreshCw className="size-4" />
          Try again
        </Button>
      ) : null}
    </div>
  )
}
