import type { Metadata } from "next"
import { SettingsDashboard } from "@/features/settings"

export const metadata: Metadata = {
    title: "Settings | Roosta",
    description: "Customize your business profile, attendance rules, and notifications.",
}

export default function SettingsPage() {
    return <SettingsDashboard />
}
