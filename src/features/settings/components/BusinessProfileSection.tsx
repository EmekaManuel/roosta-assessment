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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { businessProfileSchema, type BusinessProfileFormData } from "../schemas"
import type { BusinessProfile } from "../types"
import { getAppUrl } from "@/shared/lib/constants"
import { BUSINESS_CATEGORIES } from "@/shared/schemas/businessCategories"

const DAYS = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
]

interface BusinessProfileSectionProps {
    data: BusinessProfile
    onSubmit: (data: BusinessProfileFormData) => void
    isPending: boolean
}

export function BusinessProfileSection({
    data,
    onSubmit,
    isPending,
}: BusinessProfileSectionProps) {
    const form = useForm<BusinessProfileFormData>({
        resolver: zodResolver(businessProfileSchema),
        defaultValues: {
            name: data.name,
            slug: data.slug,
            tagline: data.tagline ?? "",
            location: data.location ?? "",
            phone: data.phone,
            category: data.category,
            openTime: data.openTime,
            closeTime: data.closeTime,
            openDays: data.openDays,
        },
    })

    const slug = form.watch("slug")
    const baseUrl = getAppUrl()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business name</FormLabel>
                            <FormControl>
                                <Input placeholder="Glam Beauty Salon" className="h-10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Booking page URL</FormLabel>
                            <FormControl>
                                <Input placeholder="glam-salon" className="h-10 font-mono" {...field} />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                                {baseUrl ? `${baseUrl}/book/${slug || "your-slug"}` : "Set NEXT_PUBLIC_APP_URL to see link"}
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tagline (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Premium hair & beauty in Lagos" className="h-10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="23 Allen Avenue, Ikeja" className="h-10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact phone / WhatsApp</FormLabel>
                            <FormControl>
                                <Input placeholder="09012345678" type="tel" className="h-10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {BUSINESS_CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="openTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Opening time</FormLabel>
                                <FormControl>
                                    <Input type="time" className="h-10" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="closeTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Closing time</FormLabel>
                                <FormControl>
                                    <Input type="time" className="h-10" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="openDays"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Open days</FormLabel>
                                <Select
                                    onValueChange={(v) => field.onChange(v.split(",").map(Number))}
                                    value={[...(field.value ?? [])].sort((a, b) => a - b).join(",")}
                                >
                                <FormControl>
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select days" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1,2,3,4,5">Mon–Fri</SelectItem>
                                    <SelectItem value="1,2,3,4,5,6">Mon–Sat</SelectItem>
                                    <SelectItem value="0,1,2,3,4,5,6">Every day</SelectItem>
                                    {DAYS.map((d) => (
                                        <SelectItem key={d.value} value={String(d.value)}>
                                            {d.label} only
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Used for your booking page and clock-in availability.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save business profile"}
                </Button>
            </form>
        </Form>
    )
}
