"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { LoadingSpinner } from "@/shared/components/feedback/LoadingSpinner"
import { Building2, Clock, Bell } from "lucide-react"
import { useSettings } from "../api/queries"
import { useUpdateBusinessProfile, useUpdateAttendanceSettings, useUpdateNotificationSettings } from "../api/mutations"
import { BusinessProfileSection } from "./BusinessProfileSection"
import { AttendanceSettingsSection } from "./AttendanceSettingsSection"
import { NotificationsSection } from "./NotificationsSection"

const BUSINESS_ID = "biz-1" // TODO: replace from auth session

export function SettingsDashboard() {
    const { data: settings, isLoading } = useSettings(BUSINESS_ID)
    const { mutate: updateBusiness, isPending: businessPending } = useUpdateBusinessProfile()
    const { mutate: updateAttendance, isPending: attendancePending } = useUpdateAttendanceSettings()
    const { mutate: updateNotifications, isPending: notificationsPending } = useUpdateNotificationSettings()

    if (isLoading || !settings) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <LoadingSpinner label="Loading settings..." />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Settings"
                description="Customize your business profile, attendance rules, and notifications."
            />

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Building2 className="size-5 text-muted-foreground" />
                        <CardTitle>Business profile</CardTitle>
                    </div>
                    <CardDescription>
                        Your public booking page and how customers find you. Used for clock-in QR links too.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BusinessProfileSection
                        data={settings.business}
                        onSubmit={(data) => updateBusiness(data)}
                        isPending={businessPending}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Clock className="size-5 text-muted-foreground" />
                        <CardTitle>Attendance</CardTitle>
                    </div>
                    <CardDescription>
                        Work start time and late deductions. Affects payroll calculations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AttendanceSettingsSection
                        data={settings.attendance}
                        onSubmit={(data) => updateAttendance(data)}
                        isPending={attendancePending}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bell className="size-5 text-muted-foreground" />
                        <CardTitle>Notifications</CardTitle>
                    </div>
                    <CardDescription>
                        WhatsApp reminders for bookings and payslips.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <NotificationsSection
                        data={settings.notifications}
                        onSubmit={(data) => updateNotifications(data)}
                        isPending={notificationsPending}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
