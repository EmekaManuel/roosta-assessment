"use client"

import { useSignOut } from "@/features/auth"
import { cn } from "@/shared/lib/utils"
import {
    ArrowLeftRight,
    LayoutDashboard,
    LogOut,
    Settings
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },

]

const bottomItems = [
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const { mutate: signOut, isPending: isSigningOut } = useSignOut()

    return (
        <aside className="flex h-full w-[220px] flex-col border-r border-border bg-card shrink-0">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 px-5 border-b border-border shrink-0">
                <Image
                    src="/app/roosta-icon.svg"
                    alt="Roosta"
                    width={24}
                    height={24}
                    className=""
                />
                <span className="font-bold text-[17px] text-foreground tracking-tight">Roosta</span>
            </div>

            {/* Primary nav */}
            <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
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

            {/* Bottom nav */}
            <div className="flex flex-col gap-1 p-3 border-t border-border">
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
                    onClick={() => signOut()}
                >
                    <LogOut className="size-4 shrink-0" />
                    {isSigningOut ? "Signing out…" : "Log out"}
                </button>
            </div>
        </aside>
    )
}
