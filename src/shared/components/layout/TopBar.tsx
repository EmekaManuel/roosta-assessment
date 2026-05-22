"use client"

import { ThemeToggle } from "./ThemeToggle"
import { LiveFeedStatus } from "./LiveFeedStatus"
import { TopBarNotifications } from "./TopBarNotifications"
import { TopBarAccountMenu } from "./TopBarAccountMenu"
import { MobileNav } from "./MobileNav"

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
    <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-card px-4 sm:px-6 shrink-0 transition-colors duration-300">
      <div className="flex items-center gap-2 min-w-0">
        <MobileNav businessName={businessName} />
        <p className="text-sm text-muted-foreground truncate hidden sm:block">
          Welcome back to{" "}
          <span className="font-semibold text-foreground">{businessName}</span>
        </p>
        <p className="text-sm font-semibold text-foreground truncate sm:hidden max-w-[120px]">
          {businessName}
        </p>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <LiveFeedStatus
          isActive={liveFeedActive}
          lastUpdatedAt={liveFeedUpdatedAt}
          className="hidden sm:flex"
        />
        <LiveFeedStatus
          isActive={liveFeedActive}
          lastUpdatedAt={liveFeedUpdatedAt}
          compact
          className="sm:hidden"
        />
        <ThemeToggle />
        <TopBarNotifications />
        <TopBarAccountMenu businessName={businessName} />
      </div>
    </header>
  )
}
