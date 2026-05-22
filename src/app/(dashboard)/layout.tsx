import { AuthGuard } from "@/features/auth"
import { DashboardShell } from "./components/DashboardShell"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  )
}
