import { describe, expect, it } from "vitest"
import {
  buildTransactionSearchParams,
  parseTransactionSearchParams,
} from "@/features/transactions/hooks/useTransactionUrlState"

describe("parseTransactionSearchParams", () => {
  it("parses search, status, risk, and page", () => {
    const params = new URLSearchParams("q=amaka&status=pending&risk=high&page=2")
    const result = parseTransactionSearchParams(params)

    expect(result.filters.search).toBe("amaka")
    expect(result.filters.status).toBe("pending")
    expect(result.filters.riskLevel).toBe("high")
    expect(result.page).toBe(2)
  })

  it("ignores invalid enum values", () => {
    const params = new URLSearchParams("status=invalid&risk=extreme")
    const result = parseTransactionSearchParams(params)

    expect(result.filters.status).toBeUndefined()
    expect(result.filters.riskLevel).toBeUndefined()
  })

  it("defaults page to 1", () => {
    const result = parseTransactionSearchParams(new URLSearchParams())
    expect(result.page).toBe(1)
  })
})

describe("buildTransactionSearchParams", () => {
  it("builds query string from filters", () => {
    const params = buildTransactionSearchParams(
      { search: "test", status: "completed", riskLevel: "low" },
      3
    )

    expect(params.get("q")).toBe("test")
    expect(params.get("status")).toBe("completed")
    expect(params.get("risk")).toBe("low")
    expect(params.get("page")).toBe("3")
  })

  it("omits empty optional params", () => {
    const params = buildTransactionSearchParams({}, 1)
    expect(params.toString()).toBe("")
  })
})
