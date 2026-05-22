"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/shared/lib/utils"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  className?: string
}

export function AuthLayout({ children, title, subtitle, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-v3-primary flex items-center justify-center px-4 py-8",
        "font-ibm-plex-sans text-v3-secondary",
        className
      )}
    >
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6 sm:gap-7">
        <Link
          href="/"
          className="inline-flex items-center justify-center transition-opacity hover:opacity-90"
          aria-label="Roosta home"
        >
          <Image
            src="/app/roosta-logo.svg"
            alt=""
            width={140}
            height={42}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <div className="w-full text-center space-y-2">
          <h1 className="font-ibm-plex-serif text-2xl sm:text-3xl font-normal tracking-normal text-v3-secondary">
            {title}
          </h1>
          {subtitle ? (
            <p className="font-ibm-plex-sans text-sm leading-relaxed text-v3-secondary/70">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="w-full">{children}</div>

        <p className="text-center font-ibm-plex-sans text-xs text-v3-secondary/50 max-w-[32ch]">
          By continuing you agree to Roosta’s terms and privacy policy.
        </p>
      </div>
    </div>
  )
}
