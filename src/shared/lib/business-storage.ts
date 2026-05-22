import type { BusinessProfileFormData } from "@/shared/schemas/businessProfile"

export const BUSINESS_STORAGE_KEY = "roosta_business"

export interface StoredBusiness {
  businessId: string
  profile: BusinessProfileFormData
  updatedAt: string
  /** Links profile to an auth user so another account does not inherit it. */
  ownerId?: string
}

export function readStoredBusiness(): StoredBusiness | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(BUSINESS_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredBusiness
  } catch {
    return null
  }
}

export function writeStoredBusiness(data: StoredBusiness): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(data))
  }
}

export function clearStoredBusiness(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(BUSINESS_STORAGE_KEY)
  }
}
