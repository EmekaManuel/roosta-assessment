import { z } from "zod"

export const transactionStatusSchema = z.enum(["completed", "pending", "failed"])
export const riskLevelSchema = z.enum(["low", "medium", "high"])

export const transactionFilterSchema = z.object({
  search: z.string().optional(),
  status: transactionStatusSchema.optional(),
  riskLevel: riskLevelSchema.optional(),
})

export type TransactionFilter = z.infer<typeof transactionFilterSchema>

export const TRANSACTIONS_PAGE_SIZE = 8
