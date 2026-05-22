import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/shared/lib/constants"
import {
    DUMMY_BUSINESS_PROFILE,
    DUMMY_ATTENDANCE_SETTINGS,
    DUMMY_NOTIFICATION_SETTINGS,
    simulateDelay,
} from "./dummy"
import type { AppSettings } from "../types"

// ── All settings for the app ───────────────────────────────────────────────
export function useSettings(businessId: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.SETTINGS, businessId],
        queryFn: async (): Promise<AppSettings> => {
            await simulateDelay()
            return {
                business: { ...DUMMY_BUSINESS_PROFILE },
                attendance: { ...DUMMY_ATTENDANCE_SETTINGS },
                notifications: { ...DUMMY_NOTIFICATION_SETTINGS },
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!businessId,
    })
}
