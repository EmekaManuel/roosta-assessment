"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/shared/components/ui/sonner"
import { queryClient } from "@/shared/lib/query-client"
import { AuthHydrator } from "@/features/auth"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthHydrator>
                {children}
            </AuthHydrator>
            <Toaster richColors position="top-right" />
        </QueryClientProvider>
    )
}
