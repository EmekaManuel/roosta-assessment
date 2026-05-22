import { z } from "zod"
import {
  riskLevelSchema,
  transactionStatusSchema,
} from "@/shared/schemas/transaction"

export { riskLevelSchema, transactionStatusSchema }

export const transactionFilterSchema = z.object({
  search: z.string().optional(),
  status: transactionStatusSchema.optional(),
  riskLevel: riskLevelSchema.optional(),
})

export type TransactionFilter = z.infer<typeof transactionFilterSchema>

export const TRANSACTIONS_PAGE_SIZE = 8
