export const QUERY_KEYS = {
  AUTH: "auth",
  DASHBOARD: "dashboard",
  TRANSACTIONS: "transactions",
  BOOKINGS: "bookings",
  STAFF: "staff",
  ATTENDANCE: "attendance",
  PAYROLL: "payroll",
  BUSINESS: "business",
  SERVICES: "services",
  PUBLIC_BUSINESS: "public_business",
  TIME_SLOTS: "time_slots",
  SETTINGS: "settings",
} as const

/** Base URL for the app (for QR codes, links). Use in client components; in SSR pass from env. */
export function getAppUrl(): string {
  if (typeof window !== "undefined") return window.location.origin
  return process.env.NEXT_PUBLIC_APP_URL ?? ""
}
