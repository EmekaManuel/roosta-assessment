"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/shared/components/ui/sonner"
import { queryClient } from "@/shared/lib/query-client"
import { AuthHydrator } from "@/features/auth"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AuthHydrator>
          {children}
        </AuthHydrator>
        <Toaster
          richColors
          position="top-right"
          offset={16}
          gap={10}
          toastOptions={{
            classNames: {
              toast:
                "rounded-xl border border-border/70 bg-card/95 text-foreground shadow-sm backdrop-blur-md",
              title: "text-sm font-medium",
              description: "text-xs text-muted-foreground",
              actionButton: "rounded-lg text-xs font-medium",
              cancelButton: "rounded-lg text-xs font-medium",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
