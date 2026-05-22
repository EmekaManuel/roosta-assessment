import { z } from "zod"
import { businessProfileSchema, type BusinessProfileFormData } from "@/shared/schemas/businessProfile"

// Re-export for feature use
export { businessProfileSchema, type BusinessProfileFormData }

// ── Attendance settings (lateness, etc.) ────────────────────────────────────
const timeSchema = z
    .string()
    .regex(/^([01]?\d|2[0-3]):[0-5]\d$/, "Use 24h format (e.g. 09:00)")
export const attendanceSettingsSchema = z.object({
    defaultWorkStart: timeSchema,
    lateDeductionAmount: z.number().min(0),
})
export type AttendanceSettingsFormData = z.infer<typeof attendanceSettingsSchema>

// ── Notifications ───────────────────────────────────────────────────────────
export const notificationSettingsSchema = z.object({
    bookingRemindersWhatsApp: z.boolean(),
    payrollPayslipWhatsApp: z.boolean(),
})
export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>
