/** Auth token key (local dev mock; production should use httpOnly cookies). */
export const TOKEN_KEY = "roosta_token"
export const MOCK_USER_KEY = "roosta_mock_user"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? ""

export const QUERY_KEYS = {
  AUTH: "auth",
  DASHBOARD: "dashboard",
  TRANSACTIONS: "transactions",
  BUSINESS: "business",
  SERVICES: "services",
  PUBLIC_BUSINESS: "public_business",
  SETTINGS: "settings",
} as const

/** Base URL for the app (for QR codes, links). Use in client components; in SSR pass from env. */
export function getAppUrl(): string {
  if (typeof window !== "undefined") return window.location.origin
  return APP_BASE_URL
}
