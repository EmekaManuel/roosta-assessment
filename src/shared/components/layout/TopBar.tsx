"use client"

import { Bell } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { ThemeToggle } from "./ThemeToggle"
import { LiveFeedStatus } from "./LiveFeedStatus"

interface TopBarProps {
  businessName?: string
  liveFeedActive?: boolean
  liveFeedUpdatedAt?: Date | null
}

export function TopBar({
  businessName = "My Business",
  liveFeedActive = false,
  liveFeedUpdatedAt = null,
}: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shrink-0 transition-colors duration-300">
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back to{" "}
          <span className="font-semibold text-foreground">{businessName}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <LiveFeedStatus
          isActive={liveFeedActive}
          lastUpdatedAt={liveFeedUpdatedAt}
          className="hidden sm:flex"
        />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="relative transition-transform active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </Button>
        <Avatar className="size-8 transition-transform hover:scale-105">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            {businessName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
