export const BUSINESS_CATEGORIES = [
  "Salon & Beauty",
  "Barbershop",
  "Clinic",
  "Restaurant",
  "Fitness",
  "Photography",
  "School",
  "Other",
] as const

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number]
