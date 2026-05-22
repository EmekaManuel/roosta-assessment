import { z } from "zod"

const timeSchema = z
  .string()
  .regex(/^([01]?\d|2[0-3]):[0-5]\d$/, "Use 24h format (e.g. 09:00)")

export const bookingTypeSchema = z.enum(["appointment", "class", "consultation", "other"])
export type BookingType = z.infer<typeof bookingTypeSchema>

export const serviceSchema = z.object({
  id: z.string(),
  businessId: z.string().optional(),
  name: z.string().min(1, "Service name is required"),
  durationMinutes: z.number().min(5, "Duration must be at least 5 minutes"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().optional(),
  bookingType: bookingTypeSchema.optional(),
  availableDays: z.array(z.number().min(0).max(6)).optional(),
  availableTimeStart: timeSchema.optional(),
  availableTimeEnd: timeSchema.optional(),
})
export type Service = z.infer<typeof serviceSchema>

export const createServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  durationMinutes: z.number().min(5, "At least 5 minutes"),
  price: z.number().min(0, "Enter a valid price"),
  bookingType: bookingTypeSchema,
  availableDays: z.array(z.number().min(0).max(6)).min(1, "Select at least one day"),
  availableTimeStart: timeSchema,
  availableTimeEnd: timeSchema,
})
export type CreateServiceFormData = z.infer<typeof createServiceSchema>

export const updateServiceSchema = createServiceSchema.partial()
export type UpdateServiceFormData = z.infer<typeof updateServiceSchema>
