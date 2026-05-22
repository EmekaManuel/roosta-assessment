// ── Public API for the settings feature ─────────────────────────────────────
// Import ONLY from @/features/settings — never from subfolders directly.

export { SettingsDashboard } from "./components/SettingsDashboard"
export { BusinessProfileSection } from "./components/BusinessProfileSection"
export { AttendanceSettingsSection } from "./components/AttendanceSettingsSection"
export { NotificationsSection } from "./components/NotificationsSection"

export { useSettings } from "./api/queries"
export {
    useUpdateBusinessProfile,
    useUpdateAttendanceSettings,
    useUpdateNotificationSettings,
} from "./api/mutations"

export {
    businessProfileSchema,
    attendanceSettingsSchema,
    notificationSettingsSchema,
} from "./schemas"
export type {
    BusinessProfileFormData,
    AttendanceSettingsFormData,
    NotificationSettingsFormData,
} from "./schemas"

export type {
    BusinessProfile,
    AttendanceSettings,
    NotificationSettings,
    AppSettings,
} from "./types"
