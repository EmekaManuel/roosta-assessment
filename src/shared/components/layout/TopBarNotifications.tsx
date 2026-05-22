"use client"

import { Bell } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/shared/lib/utils"

const PLACEHOLDER_NOTIFICATIONS = [
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

export function TopBarNotifications() {
  const unreadCount = PLACEHOLDER_NOTIFICATIONS.filter((n) => n.unread).length

  return (
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
        {PLACEHOLDER_NOTIFICATIONS.map((notification) => (
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
              <span className="shrink-0 text-[10px] text-muted-foreground">{notification.time}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
