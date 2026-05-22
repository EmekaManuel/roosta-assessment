import { z } from "zod"
import { nigerianPhoneSchema } from "@/shared/schemas/phone"

// ── Sign in ─────────────────────────────────────────────────────────────────
export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
})
export type SignInFormData = z.infer<typeof signInSchema>

// ── Sign up ────────────────────────────────────────────────────────────────
export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phone: nigerianPhoneSchema.optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
export type SignUpFormData = z.infer<typeof signUpSchema>
