"use client"

import Link from "next/link"
import {
  ArrowLeftRight,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react"
import { cn } from "@/shared/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
] as const

const bottomItems = [{ label: "Settings", href: "/dashboard/settings", icon: Settings }] as const

interface SidebarNavContentProps {
  pathname: string
  onSignOut: () => void
  isSigningOut?: boolean
}

export function SidebarNavContent({
  pathname,
  onSignOut,
  isSigningOut = false,
}: SidebarNavContentProps) {
  return (
    <>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="flex flex-col gap-1 border-t border-border pt-3 mt-3">
        {bottomItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
        <button
          type="button"
          disabled={isSigningOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full text-left disabled:opacity-50"
          onClick={onSignOut}
        >
          <LogOut className="size-4 shrink-0" />
          {isSigningOut ? "Signing out…" : "Log out"}
        </button>
      </div>
    </>
  )
}
