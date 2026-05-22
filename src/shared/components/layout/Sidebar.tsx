"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSignOut } from "@/features/auth"
import { SidebarNavContent } from "./SidebarNavContent"

interface SidebarProps {
  businessName?: string
}

export function Sidebar({ businessName }: SidebarProps) {
  const pathname = usePathname()
  const { mutate: signOut, isPending: isSigningOut } = useSignOut()

  return (
    <aside className="flex h-full w-[220px] flex-col border-r border-border bg-card shrink-0">
      <div className="flex min-h-16 flex-col justify-center gap-0.5 px-5 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <Image src="/app/roosta-icon.svg" alt="Roosta" width={24} height={24} />
          <span className="font-bold text-[17px] text-foreground tracking-tight">Roosta</span>
        </div>
        {businessName ? (
          <p className="text-xs text-muted-foreground truncate pl-9" title={businessName}>
            {businessName}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col flex-1 p-3 overflow-y-auto">
        <SidebarNavContent
          pathname={pathname}
          onSignOut={() => signOut()}
          isSigningOut={isSigningOut}
        />
      </div>
    </aside>
  )
}
