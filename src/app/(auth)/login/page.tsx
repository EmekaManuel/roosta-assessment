import { AuthLayout, SignInForm } from "@/features/auth"

export const metadata = {
  title: "Sign in | Roosta",
  description: "Sign in to your Roosta account.",
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Enter your email and password to access your dashboard."
    >
      <SignInForm />
    </AuthLayout>
  )
}
