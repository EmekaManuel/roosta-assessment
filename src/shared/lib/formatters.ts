import { format } from "date-fns"

/**
 * Format a number as Nigerian Naira currency.
 * e.g. formatCurrency(15000) → "₦15,000"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Format a date string or Date object to Roosta standard display.
 * e.g. "26 Feb 2026"
 */
export function formatDate(date: string | Date): string {
    return format(new Date(date), "dd MMM yyyy")
}

/**
 * Format a time string (HH:mm) to 12-hour display.
 * e.g. "14:30" → "2:30 PM"
 */
export function formatTime(time: string): string {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const h = hours % 12 || 12
    return `${h}:${String(minutes).padStart(2, "0")} ${period}`
}

/**
 * Format a phone number for WhatsApp deep link.
 * Converts 0812... to +234812...
 */
export function toWhatsAppPhone(phone: string): string {
    if (phone.startsWith("+234")) return phone
    return "+234" + phone.slice(1)
}
