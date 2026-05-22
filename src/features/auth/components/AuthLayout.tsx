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
        "min-h-screen w-full bg-v3-primary flex flex-col",
        "font-ibm-plex-sans text-v3-secondary",
        className
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Roosta home"
        >
          <Image
            src="/app/roosta-logo.svg"
            alt=""
            width={140}
            height={42}
            className="h-9 w-auto"
          />
        </Link>

        <div className="w-full max-w-[400px]">
          <div className="mb-8 text-center">
            <h1 className="font-ibm-plex-serif text-2xl sm:text-3xl font-normal tracking-normal text-v3-secondary">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 font-ibm-plex-sans text-sm leading-relaxed text-v3-secondary/70">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>

        <p className="mt-8 text-center font-ibm-plex-sans text-xs text-v3-secondary/50">
          By continuing you agree to Roosta’s terms and privacy policy.
        </p>
      </div>
    </div>
  )
}
