"use client"

import { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  toggleClassName?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, toggleClassName, disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={cn("pr-11", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={cn(
            "absolute right-1 top-1/2 size-9 -translate-y-1/2",
            "text-muted-foreground hover:text-foreground hover:bg-transparent",
            toggleClassName
          )}
          onClick={() => setVisible((show) => !show)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="size-4 shrink-0" /> : <Eye className="size-4 shrink-0" />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
