// ── Business profile (saved) ─────────────────────────────────────────────────
export interface BusinessProfile {
    id: string
    businessId: string
    name: string
    slug: string
    tagline: string
    location: string
    phone: string
    category: string
    openTime: string
    closeTime: string
    openDays: number[]
    updatedAt: string
}

// ── Attendance settings ─────────────────────────────────────────────────────
export interface AttendanceSettings {
    businessId: string
    defaultWorkStart: string
    lateDeductionAmount: number
    updatedAt: string
}

// ── Notification preferences ───────────────────────────────────────────────
export interface NotificationSettings {
    businessId: string
    bookingRemindersWhatsApp: boolean
    payrollPayslipWhatsApp: boolean
    updatedAt: string
}

// ── All settings in one payload for the page ───────────────────────────────
export interface AppSettings {
    business: BusinessProfile
    attendance: AttendanceSettings
    notifications: NotificationSettings
}
