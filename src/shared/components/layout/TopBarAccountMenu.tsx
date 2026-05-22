"use client"

import Link from "next/link"
import { LogOut, Settings } from "lucide-react"
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

interface TopBarAccountMenuProps {
  businessName: string
}

function getInitials(name: string, businessName: string): string {
  const source = name.trim() || businessName.trim()
  if (!source) return "RB"
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return source.slice(0, 2).toUpperCase()
}

export function TopBarAccountMenu({ businessName }: TopBarAccountMenuProps) {
  const user = useAuthStore((s) => s.user)
  const { mutate: signOut, isPending: isSigningOut } = useSignOut()

  const displayName = user?.name ?? "Account"
  const displayEmail = user?.email ?? ""
  const initials = getInitials(displayName, businessName)

  return (
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
  )
}
