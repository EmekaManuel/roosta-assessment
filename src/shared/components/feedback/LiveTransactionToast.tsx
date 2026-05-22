"use client"

import { toast } from "sonner"
import { cn } from "@/shared/lib/utils"

const LIVE_TOAST_POSITION = "bottom-right" as const

interface LiveTransactionToastOptions {
  message: string
  variant: "info" | "warning"
}

interface LiveTransactionToastContentProps {
  message: string
  variant: "info" | "warning"
}

function LiveTransactionToastContent({ message, variant }: LiveTransactionToastContentProps) {
  const isWarning = variant === "warning"

  return (
    <div
      className={cn(
        "pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border px-4 py-3",
        "bg-card/95 text-foreground shadow-sm backdrop-blur-md",
        "animate-in fade-in slide-in-from-top-2 duration-300",
        isWarning
          ? "border-orange-500/25 shadow-orange-500/5"
          : "border-border/80 shadow-black/5"
      )}
    >
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          isWarning ? "bg-orange-500" : "bg-primary"
        )}
        aria-hidden
      />
      <div className="min-w-0 space-y-0.5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {isWarning ? "Flagged" : "New activity"}
        </p>
        <p className="truncate text-sm font-medium leading-snug text-foreground">
          {message}
        </p>
      </div>
    </div>
  )
}

export function showLiveTransactionToast({
  message,
  variant,
}: LiveTransactionToastOptions): void {
  toast.custom(
    () => <LiveTransactionToastContent message={message} variant={variant} />,
    {
      position: LIVE_TOAST_POSITION,
      duration: variant === "warning" ? 5000 : 4000,
      unstyled: true,
    }
  )
}
