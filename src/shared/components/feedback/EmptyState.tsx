import { cn } from "@/shared/lib/utils"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
    icon?: LucideIcon
    title: string
    description?: string
    action?: React.ReactNode
    className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-16 px-6 text-center",
                className
            )}
        >
            {Icon && (
                <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-6 text-muted-foreground" />
                </div>
            )}
            <div className="space-y-1">
                <p className="font-semibold text-foreground">{title}</p>
                {description && <p className="text-sm text-muted-foreground max-w-xs mx-auto">{description}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}
