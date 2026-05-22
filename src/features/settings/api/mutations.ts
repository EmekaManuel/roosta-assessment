import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { toBusinessProfileRecord } from "@/shared/lib/business-profile-mapper"
import { useBusinessStore } from "@/shared/store/business-store"
import type { BusinessProfileFormData } from "../schemas"
import type { AttendanceSettingsFormData, NotificationSettingsFormData } from "../schemas"
import type { BusinessProfile, AttendanceSettings, NotificationSettings } from "../types"
import {
    DUMMY_ATTENDANCE_SETTINGS,
    DUMMY_NOTIFICATION_SETTINGS,
    simulateDelay,
} from "./dummy"

// ── Update business profile ───────────────────────────────────────────────
export function useUpdateBusinessProfile() {
    const queryClient = useQueryClient()
    const updateProfile = useBusinessStore((s) => s.updateProfile)

    return useMutation({
        mutationFn: async (data: BusinessProfileFormData): Promise<BusinessProfile> => {
            await simulateDelay(500)
            updateProfile(data)
            const stored = useBusinessStore.getState().getSnapshot()
            if (!stored) {
                throw new Error("No business profile in session")
            }
            return toBusinessProfileRecord(stored)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SETTINGS] })
            toast.success("Business profile updated")
        },
        onError: () => {
            toast.error("Failed to save. Please try again.")
        },
    })
}

// ── Update attendance settings ──────────────────────────────────────────────
export function useUpdateAttendanceSettings() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: AttendanceSettingsFormData): Promise<AttendanceSettings> => {
            await simulateDelay(400)
            const now = new Date().toISOString()
            const businessId = useBusinessStore.getState().businessId ?? DUMMY_ATTENDANCE_SETTINGS.businessId
            Object.assign(DUMMY_ATTENDANCE_SETTINGS, {
                businessId,
                defaultWorkStart: data.defaultWorkStart,
                lateDeductionAmount: data.lateDeductionAmount,
                updatedAt: now,
            })
            return { ...DUMMY_ATTENDANCE_SETTINGS }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SETTINGS] })
            toast.success("Attendance settings saved")
        },
        onError: () => {
            toast.error("Failed to save. Please try again.")
        },
    })
}

// ── Update notification settings ───────────────────────────────────────────
export function useUpdateNotificationSettings() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: NotificationSettingsFormData): Promise<NotificationSettings> => {
            await simulateDelay(300)
            const now = new Date().toISOString()
            const businessId =
                useBusinessStore.getState().businessId ?? DUMMY_NOTIFICATION_SETTINGS.businessId
            Object.assign(DUMMY_NOTIFICATION_SETTINGS, {
                businessId,
                bookingRemindersWhatsApp: data.bookingRemindersWhatsApp,
                payrollPayslipWhatsApp: data.payrollPayslipWhatsApp,
                updatedAt: now,
            })
            return { ...DUMMY_NOTIFICATION_SETTINGS }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SETTINGS] })
            toast.success("Notification preferences saved")
        },
        onError: () => {
            toast.error("Failed to save. Please try again.")
        },
    })
}
