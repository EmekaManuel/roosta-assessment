"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form"
import { Button } from "@/shared/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { notificationSettingsSchema, type NotificationSettingsFormData } from "../schemas"
import type { NotificationSettings } from "../types"

interface NotificationsSectionProps {
    data: NotificationSettings
    onSubmit: (data: NotificationSettingsFormData) => void
    isPending: boolean
}

export function NotificationsSection({
    data,
    onSubmit,
    isPending,
}: NotificationsSectionProps) {
    const form = useForm<NotificationSettingsFormData>({
        resolver: zodResolver(notificationSettingsSchema),
        defaultValues: {
            bookingRemindersWhatsApp: data.bookingRemindersWhatsApp,
            payrollPayslipWhatsApp: data.payrollPayslipWhatsApp,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="bookingRemindersWhatsApp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Booking reminders (WhatsApp)</FormLabel>
                            <p className="text-sm text-muted-foreground mb-2">
                                Send customers a reminder 24h and 1h before their appointment.
                            </p>
                            <Select
                                onValueChange={(v) => field.onChange(v === "on")}
                                value={field.value ? "on" : "off"}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-10 w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="on">On</SelectItem>
                                    <SelectItem value="off">Off</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="payrollPayslipWhatsApp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Payslips via WhatsApp</FormLabel>
                            <p className="text-sm text-muted-foreground mb-2">
                                Send staff their payslip on WhatsApp when you run payroll.
                            </p>
                            <Select
                                onValueChange={(v) => field.onChange(v === "on")}
                                value={field.value ? "on" : "off"}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-10 w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="on">On</SelectItem>
                                    <SelectItem value="off">Off</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save preferences"}
                </Button>
            </form>
        </Form>
    )
}
