/** Mock sign-in credentials for local / Docker / assessment demos. */
export const DEMO_SIGN_IN_EMAIL = "owner@roosta.ng"
export const DEMO_SIGN_IN_PASSWORD = "RoostaDemo1"

export const DEMO_SIGN_IN_HINT = `Demo: ${DEMO_SIGN_IN_EMAIL} / ${DEMO_SIGN_IN_PASSWORD}`

export function isDemoSignInCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_SIGN_IN_EMAIL.toLowerCase() &&
    password === DEMO_SIGN_IN_PASSWORD
  )
}
