"use client"

import { create } from "zustand"
import type { BusinessProfileFormData } from "@/shared/schemas/businessProfile"
import {
  clearStoredBusiness,
  readStoredBusiness,
  writeStoredBusiness,
  type StoredBusiness,
} from "@/shared/lib/business-storage"

interface BusinessState {
  businessId: string | null
  profile: BusinessProfileFormData | null
  updatedAt: string | null
  isHydrated: boolean
  hydrate: () => void
  setBusiness: (businessId: string, profile: BusinessProfileFormData) => void
  updateProfile: (profile: BusinessProfileFormData) => void
  clearBusiness: () => void
  getSnapshot: () => StoredBusiness | null
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businessId: null,
  profile: null,
  updatedAt: null,
  isHydrated: false,

  hydrate: () => {
    const stored = readStoredBusiness()
    if (stored) {
      set({
        businessId: stored.businessId,
        profile: stored.profile,
        updatedAt: stored.updatedAt,
        isHydrated: true,
      })
      return
    }
    set({ isHydrated: true })
  },

  setBusiness: (businessId, profile) => {
    const updatedAt = new Date().toISOString()
    writeStoredBusiness({ businessId, profile, updatedAt })
    set({ businessId, profile, updatedAt })
  },

  updateProfile: (profile) => {
    const { businessId } = get()
    if (!businessId) return
    get().setBusiness(businessId, profile)
  },

  clearBusiness: () => {
    clearStoredBusiness()
    set({ businessId: null, profile: null, updatedAt: null })
  },

  getSnapshot: () => {
    const { businessId, profile, updatedAt } = get()
    if (!businessId || !profile || !updatedAt) return null
    return { businessId, profile, updatedAt }
  },
}))
