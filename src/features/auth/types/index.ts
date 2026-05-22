// ── User (from session / API) ───────────────────────────────────────────────
export interface AuthUser {
  id: string
  name: string
  email: string
  image?: string | null
  phone?: string | null
  businessId?: string | null
  onboardingComplete?: boolean
}

// ── Session with backend token (for api-client sync) ───────────────────────
export interface SessionWithToken {
  user: AuthUser
  expires: string
  token?: string
}
