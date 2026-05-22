import { readStoredBusiness } from "@/shared/lib/business-storage"
import { useBusinessStore } from "@/shared/store/business-store"
import type { BusinessProfileFormData } from "@/shared/schemas/businessProfile"

export interface SessionUserLike {
  id: string
  onboardingComplete?: boolean
  businessId?: string | null
}

/** Rehydrate business store from localStorage and mark user onboarding complete when profile exists. */
export function applyStoredBusinessToUser<T extends SessionUserLike>(user: T): T {
  const stored = readStoredBusiness()
  if (!stored?.profile) {
    return user
  }

  if (stored.ownerId && stored.ownerId !== user.id) {
    return user
  }

  useBusinessStore.setState({
    businessId: stored.businessId,
    profile: stored.profile,
    updatedAt: stored.updatedAt,
    isHydrated: true,
  })

  return {
    ...user,
    onboardingComplete: true,
    businessId: stored.businessId,
  }
}

export function setStoredBusinessForUser(
  userId: string,
  businessId: string,
  profile: BusinessProfileFormData
): void {
  useBusinessStore.getState().setBusiness(businessId, profile, userId)
}

/** Clear stored profile when a different account signs up (keeps data for same user after logout). */
export function clearStoredBusinessIfOwnedByOther(userId: string): void {
  const stored = readStoredBusiness()
  if (stored?.ownerId && stored.ownerId !== userId) {
    useBusinessStore.getState().clearBusiness()
  }
}
