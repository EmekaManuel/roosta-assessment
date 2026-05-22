import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/shared/lib/constants"
import type { BusinessProfileFormData } from "../schemas"
import type { AttendanceSettingsFormData, NotificationSettingsFormData } from "../schemas"
import type { BusinessProfile, AttendanceSettings, NotificationSettings } from "../types"
import {
    DUMMY_BUSINESS_PROFILE,
    DUMMY_ATTENDANCE_SETTINGS,
    DUMMY_NOTIFICATION_SETTINGS,
    simulateDelay,
} from "./dummy"

// ── Update business profile ───────────────────────────────────────────────
export function useUpdateBusinessProfile() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: BusinessProfileFormData): Promise<BusinessProfile> => {
            await simulateDelay(500)
            const now = new Date().toISOString()
            Object.assign(DUMMY_BUSINESS_PROFILE, {
                name: data.name,
                slug: data.slug,
                tagline: data.tagline ?? "",
                location: data.location ?? "",
                phone: data.phone,
                category: data.category,
                openTime: data.openTime,
                closeTime: data.closeTime,
                openDays: data.openDays,
                updatedAt: now,
            })
            return { ...DUMMY_BUSINESS_PROFILE }
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
            Object.assign(DUMMY_ATTENDANCE_SETTINGS, {
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
            Object.assign(DUMMY_NOTIFICATION_SETTINGS, {
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
