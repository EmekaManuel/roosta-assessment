import { z } from "zod"

export const nigerianPhoneSchema = z
    .string()
    .regex(/^(\+234|0)[789]\d{9}$/, "Enter a valid Nigerian phone number (e.g. 08012345678)")
