"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useSignOut } from "@/features/auth"
import { Button } from "@/shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { cn } from "@/shared/lib/utils"
import { SidebarNavContent } from "./SidebarNavContent"

interface MobileNavProps {
  businessName?: string
}

export function MobileNav({ businessName }: MobileNavProps) {
  const pathname = usePathname()
  const { mutate: signOut, isPending: isSigningOut } = useSignOut()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden shrink-0" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100vw-2rem,280px)] p-0 flex flex-col">
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="text-base font-bold">Roosta</SheetTitle>
          {businessName ? (
            <p className="text-xs text-muted-foreground truncate font-normal">{businessName}</p>
          ) : null}
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-y-auto p-3">
          <SidebarNavContent pathname={pathname} onSignOut={() => signOut()} isSigningOut={isSigningOut} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
