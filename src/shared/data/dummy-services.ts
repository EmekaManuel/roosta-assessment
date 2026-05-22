import type { Service } from "@/shared/schemas/service"

const BUSINESS_ID = "biz-1"

export const SLUG_TO_BUSINESS_ID: Record<string, string> = {
  "glam-salon": BUSINESS_ID,
  "fade-kings": "biz-2",
}

/** Mutable list of services; services feature mutates this on create/update/delete. */
export const DUMMY_SERVICES: Service[] = [
  {
    id: "svc-1",
    businessId: BUSINESS_ID,
    name: "Haircut & Style",
    durationMinutes: 45,
    price: 5000,
    bookingType: "appointment",
    availableDays: [1, 2, 3, 4, 5, 6],
    availableTimeStart: "09:00",
    availableTimeEnd: "18:00",
  },
  {
    id: "svc-2",
    businessId: BUSINESS_ID,
    name: "Full Hair Treatment",
    durationMinutes: 90,
    price: 12000,
    bookingType: "appointment",
    availableDays: [1, 2, 3, 4, 5],
    availableTimeStart: "10:00",
    availableTimeEnd: "16:00",
  },
  {
    id: "svc-3",
    businessId: BUSINESS_ID,
    name: "Braids",
    durationMinutes: 180,
    price: 20000,
    bookingType: "appointment",
    availableDays: [1, 2, 3, 4, 5, 6],
    availableTimeStart: "09:00",
    availableTimeEnd: "15:00",
  },
  {
    id: "svc-4",
    businessId: BUSINESS_ID,
    name: "Relaxer",
    durationMinutes: 60,
    price: 8000,
    bookingType: "appointment",
    availableDays: [1, 2, 3, 4, 5, 6],
    availableTimeStart: "09:00",
    availableTimeEnd: "18:00",
  },
  {
    id: "svc-5",
    businessId: BUSINESS_ID,
    name: "Manicure",
    durationMinutes: 30,
    price: 3500,
    bookingType: "appointment",
    availableDays: [1, 2, 3, 4, 5, 6],
    availableTimeStart: "09:00",
    availableTimeEnd: "18:00",
  },
  {
    id: "svc-6",
    businessId: BUSINESS_ID,
    name: "Pedicure",
    durationMinutes: 45,
    price: 4500,
    bookingType: "appointment",
    availableDays: [1, 2, 3, 4, 5, 6],
    availableTimeStart: "09:00",
    availableTimeEnd: "18:00",
  },
]
