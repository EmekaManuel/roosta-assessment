import { cn } from "@/shared/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delayMs?: number
}

/** Fade + slide entrance for dashboard sections. */
export function AnimatedSection({ children, className, delayMs = 0 }: AnimatedSectionProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both",
        className
      )}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
