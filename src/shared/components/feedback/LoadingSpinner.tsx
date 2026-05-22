import { cn } from "@/shared/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
    className?: string
    size?: "sm" | "md" | "lg"
    label?: string
}

const sizeMap = {
    sm: "size-4",
    md: "size-6",
    lg: "size-10",
}

export function LoadingSpinner({ className, size = "md", label = "Loading..." }: LoadingSpinnerProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground", className)}>
            <Loader2 className={cn("animate-spin", sizeMap[size])} />
            <span className="text-sm">{label}</span>
        </div>
    )
}
