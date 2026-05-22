import type { BusinessProfileFormData } from "@/shared/schemas/businessProfile"
import type { StoredBusiness } from "@/shared/lib/business-storage"

/** Maps persisted onboarding/settings form data to the settings API shape. */
export function toBusinessProfileRecord(stored: StoredBusiness) {
  return {
    id: `bp-${stored.businessId}`,
    businessId: stored.businessId,
    name: stored.profile.name,
    slug: stored.profile.slug,
    tagline: stored.profile.tagline ?? "",
    location: stored.profile.location ?? "",
    phone: stored.profile.phone,
    category: stored.profile.category,
    openTime: stored.profile.openTime,
    closeTime: stored.profile.closeTime,
    openDays: stored.profile.openDays,
    updatedAt: stored.updatedAt,
  }
}

export function formDataFromBusinessProfile(
  profile: ReturnType<typeof toBusinessProfileRecord>
): BusinessProfileFormData {
  return {
    name: profile.name,
    slug: profile.slug,
    tagline: profile.tagline || undefined,
    location: profile.location || undefined,
    phone: profile.phone,
    category: profile.category,
    openTime: profile.openTime,
    closeTime: profile.closeTime,
    openDays: profile.openDays,
  }
}
