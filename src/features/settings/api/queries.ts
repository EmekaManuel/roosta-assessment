import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { toBusinessProfileRecord } from "@/shared/lib/business-profile-mapper"
import { useBusinessStore } from "@/shared/store/business-store"
import {
    DUMMY_ATTENDANCE_SETTINGS,
    DUMMY_NOTIFICATION_SETTINGS,
    getDefaultBusinessProfile,
    simulateDelay,
} from "./dummy"
import type { AppSettings } from "../types"

// ── All settings for the app ───────────────────────────────────────────────
export function useSettings(businessId: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.SETTINGS, businessId],
        queryFn: async (): Promise<AppSettings> => {
            await simulateDelay()
            const stored = useBusinessStore.getState().getSnapshot()
            const business =
                stored && stored.businessId === businessId
                    ? toBusinessProfileRecord(stored)
                    : getDefaultBusinessProfile(businessId)

            return {
                business,
                attendance: { ...DUMMY_ATTENDANCE_SETTINGS, businessId },
                notifications: { ...DUMMY_NOTIFICATION_SETTINGS, businessId },
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!businessId,
    })
}
