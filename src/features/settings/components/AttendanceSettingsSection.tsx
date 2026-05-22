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
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { attendanceSettingsSchema, type AttendanceSettingsFormData } from "../schemas"
import type { AttendanceSettings } from "../types"

interface AttendanceSettingsSectionProps {
    data: AttendanceSettings
    onSubmit: (data: AttendanceSettingsFormData) => void
    isPending: boolean
}

export function AttendanceSettingsSection({
    data,
    onSubmit,
    isPending,
}: AttendanceSettingsSectionProps) {
    const form = useForm<AttendanceSettingsFormData>({
        resolver: zodResolver(attendanceSettingsSchema),
        defaultValues: {
            defaultWorkStart: data.defaultWorkStart,
            lateDeductionAmount: data.lateDeductionAmount,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="defaultWorkStart"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Default work start time</FormLabel>
                            <FormControl>
                                <Input type="time" className="h-10 w-[140px]" {...field} />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                                Clock-ins after this time are marked late. Used for payroll deductions.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lateDeductionAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Late deduction (₦ per occurrence)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    step={100}
                                    className="h-10 w-[140px]"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value === "" ? 0 : Number(e.target.value))
                                    }
                                />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                                Amount deducted from pay for each late clock-in in the month.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save attendance settings"}
                </Button>
            </form>
        </Form>
    )
}
