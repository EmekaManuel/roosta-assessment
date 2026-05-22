"use client"

import Link from "next/link"
import { Bell, LogOut, Settings } from "lucide-react"
import { useAuthStore, useSignOut } from "@/features/auth"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { ThemeToggle } from "./ThemeToggle"
import { LiveFeedStatus } from "./LiveFeedStatus"
import { cn } from "@/shared/lib/utils"

interface TopBarProps {
  businessName?: string
  liveFeedActive?: boolean
  liveFeedUpdatedAt?: Date | null
}

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Flagged transaction",
    description: "TXN-2841 flagged for review — high risk score.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "Booking reminder",
    description: "3 appointments scheduled for tomorrow.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "3",
    title: "Payroll ready",
    description: "February payroll is ready to review.",
    time: "Yesterday",
    unread: false,
  },
] as const

function getInitials(name: string, businessName: string): string {
  const source = name.trim() || businessName.trim()
  if (!source) return "RB"
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return source.slice(0, 2).toUpperCase()
}

export function TopBar({
  businessName = "My Business",
  liveFeedActive = false,
  liveFeedUpdatedAt = null,
}: TopBarProps) {
  const user = useAuthStore((s) => s.user)
  const { mutate: signOut, isPending: isSigningOut } = useSignOut()

  const displayName = user?.name ?? "Account"
  const displayEmail = user?.email ?? ""
  const initials = getInitials(displayName, businessName)
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => n.unread).length

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative transition-transform active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              {unreadCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MOCK_NOTIFICATIONS.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-default flex-col items-start gap-0.5 py-2.5 focus:bg-accent"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      notification.unread ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {notification.title}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {notification.description}
                </p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center text-center text-xs text-muted-foreground"
              onSelect={(e) => e.preventDefault()}
            >
              Mark all as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full p-0 transition-transform active:scale-95"
              aria-label="Account menu"
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              {displayEmail ? (
                <p className="mt-1 text-xs text-muted-foreground truncate">{displayEmail}</p>
              ) : null}
              {businessName ? (
                <p className="mt-1 text-xs text-muted-foreground truncate">{businessName}</p>
              ) : null}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">
                <Settings className="size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={isSigningOut}
              onSelect={() => signOut()}
            >
              <LogOut className="size-4" />
              {isSigningOut ? "Signing out…" : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
