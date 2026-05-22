import { AuthLayout, SignUpForm } from "@/features/auth"

export const metadata = {
  title: "Create account | Roosta",
  description: "Create your Roosta account.",
}

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing appointments and payroll in one place."
    >
      <SignUpForm />
    </AuthLayout>
  )
}
