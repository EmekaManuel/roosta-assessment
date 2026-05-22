"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  riskLevelSchema,
  transactionStatusSchema,
  type TransactionFilter,
} from "../schemas"

const PARAM_SEARCH = "q"
const PARAM_STATUS = "status"
const PARAM_RISK = "risk"
const PARAM_PAGE = "page"

function parsePage(value: string | null): number {
  if (!value) return 1
  const n = Number.parseInt(value, 10)
  if (Number.isNaN(n) || n < 1) return 1
  return n
}

export function parseTransactionSearchParams(
  searchParams: URLSearchParams
): { filters: TransactionFilter; page: number } {
  const filters: TransactionFilter = {}

  const search = searchParams.get(PARAM_SEARCH)?.trim()
  if (search) filters.search = search

  const status = searchParams.get(PARAM_STATUS)
  const statusParsed = transactionStatusSchema.safeParse(status)
  if (statusParsed.success) filters.status = statusParsed.data

  const risk = searchParams.get(PARAM_RISK)
  const riskParsed = riskLevelSchema.safeParse(risk)
  if (riskParsed.success) filters.riskLevel = riskParsed.data

  return {
    filters,
    page: parsePage(searchParams.get(PARAM_PAGE)),
  }
}

export function buildTransactionSearchParams(
  filters: TransactionFilter,
  page: number
): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.search?.trim()) {
    params.set(PARAM_SEARCH, filters.search.trim())
  }
  if (filters.status) {
    params.set(PARAM_STATUS, filters.status)
  }
  if (filters.riskLevel) {
    params.set(PARAM_RISK, filters.riskLevel)
  }
  if (page > 1) {
    params.set(PARAM_PAGE, String(page))
  }

  return params
}

export function useTransactionUrlState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { filters, page } = useMemo(
    () => parseTransactionSearchParams(searchParams),
    [searchParams]
  )

  const replaceUrl = useCallback(
    (nextFilters: TransactionFilter, nextPage: number) => {
      const params = buildTransactionSearchParams(nextFilters, nextPage)
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname]
  )

  const setFilters = useCallback(
    (nextFilters: TransactionFilter) => {
      replaceUrl(nextFilters, 1)
    },
    [replaceUrl]
  )

  const setPage = useCallback(
    (nextPage: number) => {
      replaceUrl(filters, nextPage)
    },
    [replaceUrl, filters]
  )

  /** Updates only `q` while preserving other filters from the current URL. */
  const setSearchQuery = useCallback(
    (search: string) => {
      const current = parseTransactionSearchParams(searchParams)
      replaceUrl(
        { ...current.filters, search: search || undefined },
        1
      )
    },
    [searchParams, replaceUrl]
  )

  return {
    filters,
    page,
    setFilters,
    setPage,
    setSearchQuery,
  }
}
