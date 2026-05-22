import type { Metadata } from "next"
import { DashboardHome } from "@/features/dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Roosta",
  description: "Transaction overview, risk insights, and customer activity.",
}

export default function DashboardPage() {
  return <DashboardHome />
}
