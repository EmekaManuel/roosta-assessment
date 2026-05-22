import { z } from "zod"

export const transactionStatusSchema = z.enum(["completed", "pending", "failed"])
export const riskLevelSchema = z.enum(["low", "medium", "high"])

export type TransactionStatus = z.infer<typeof transactionStatusSchema>
export type RiskLevel = z.infer<typeof riskLevelSchema>
