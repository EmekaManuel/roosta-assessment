import type {
    BusinessProfile,
    AttendanceSettings,
    NotificationSettings,
} from "../types"

const BUSINESS_ID = "biz-1"

export const DUMMY_BUSINESS_PROFILE: BusinessProfile = {
    id: "bp-1",
    businessId: BUSINESS_ID,
    name: "Glam Beauty Salon",
    slug: "glam-salon",
    tagline: "Premium hair & beauty services in Lagos",
    location: "23 Allen Avenue, Ikeja, Lagos",
    phone: "09012345678",
    category: "Salon & Beauty",
    openTime: "09:00",
    closeTime: "18:00",
    openDays: [1, 2, 3, 4, 5, 6], // Mon–Sat
    updatedAt: new Date().toISOString(),
}

export const DUMMY_ATTENDANCE_SETTINGS: AttendanceSettings = {
    businessId: BUSINESS_ID,
    defaultWorkStart: "09:00",
    lateDeductionAmount: 500,
    updatedAt: new Date().toISOString(),
}

export const DUMMY_NOTIFICATION_SETTINGS: NotificationSettings = {
    businessId: BUSINESS_ID,
    bookingRemindersWhatsApp: true,
    payrollPayslipWhatsApp: true,
    updatedAt: new Date().toISOString(),
}

export function simulateDelay(ms = 400): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
