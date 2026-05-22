import { z } from "zod"
import { nigerianPhoneSchema } from "./phone"

// HH:mm (24h)
const timeSchema = z
  .string()
  .regex(/^([01]?\d|2[0-3]):[0-5]\d$/, "Use 24h format (e.g. 09:00)")

export const businessProfileSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  slug: z
    .string()
    .min(2, "URL slug is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only"),
  tagline: z.string().optional(),
  location: z.string().optional(),
  phone: nigerianPhoneSchema,
  category: z.string().min(1, "Select a category"),
  openTime: timeSchema,
  closeTime: timeSchema,
  openDays: z.array(z.number().min(0).max(6)).min(1, "Select at least one day"),
})

export type BusinessProfileFormData = z.infer<typeof businessProfileSchema>
