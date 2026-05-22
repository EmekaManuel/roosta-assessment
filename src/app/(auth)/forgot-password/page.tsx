import { AuthLayout } from "@/features/auth"

export const metadata = {
  title: "Reset password | Roosta",
  description: "Reset your Roosta account password.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email and we’ll send you a link to reset your password."
    >
      <p className="font-ibm-plex-sans text-sm text-v3-secondary/70 text-center">
        This page will be wired to your external API. For now, contact support to reset your password.
      </p>
    </AuthLayout>
  )
}
