"use client"

import { useBusinessStore } from "@/shared/store/business-store"

export function useActiveBusiness() {
  const businessId = useBusinessStore((s) => s.businessId)
  const profile = useBusinessStore((s) => s.profile)
  const isHydrated = useBusinessStore((s) => s.isHydrated)

  return {
    businessId: businessId ?? "",
    businessName: profile?.name ?? "",
    profile,
    isReady: isHydrated && !!businessId && !!profile,
    isHydrated,
  }
}
