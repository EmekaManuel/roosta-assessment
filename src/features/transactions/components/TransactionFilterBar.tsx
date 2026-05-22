"use client"

import { useEffect, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { useDebounce } from "@/shared/hooks/useDebounce"
import type { TransactionFilter } from "../schemas"
import type { RiskLevel, TransactionStatus } from "../types"

const SEARCH_DEBOUNCE_MS = 400

const statusOptions: { value: TransactionStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
]

const riskOptions: { value: RiskLevel | "all"; label: string }[] = [
  { value: "all", label: "All risk levels" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

interface TransactionSearchInputProps {
  initialValue: string
  onSearchQueryChange: (value: string) => void
}

function TransactionSearchInput({ initialValue, onSearchQueryChange }: TransactionSearchInputProps) {
  const [searchInput, setSearchInput] = useState(initialValue)
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    const trimmed = debouncedSearch.trim()
    if (trimmed === initialValue.trim()) return
    onSearchQueryChange(trimmed)
  }, [debouncedSearch, initialValue, onSearchQueryChange])

  return (
    <div className="relative flex-1 min-w-0 w-full sm:max-w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <Input
        id="transaction-search"
        placeholder="Search by customer or reference..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}

interface TransactionFilterBarProps {
  filters: TransactionFilter
  onFiltersChange: (filters: TransactionFilter) => void
  onSearchQueryChange: (search: string) => void
}

export function TransactionFilterBar({
  filters,
  onFiltersChange,
  onSearchQueryChange,
}: TransactionFilterBarProps) {
  const [searchResetKey, setSearchResetKey] = useState(0)
  const hasActiveFilters = !!(filters.status || filters.riskLevel || filters.search)

  function handleClear() {
    setSearchResetKey((k) => k + 1)
    onFiltersChange({})
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <TransactionSearchInput
        key={searchResetKey}
        initialValue={filters.search ?? ""}
        onSearchQueryChange={onSearchQueryChange}
      />

      <Select
        value={filters.status ?? "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            status: value === "all" ? undefined : (value as TransactionStatus),
          })
        }
      >
        <SelectTrigger id="transaction-status-filter" className="w-full sm:w-[160px]">
          <SlidersHorizontal className="size-4 mr-2 text-muted-foreground shrink-0" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.riskLevel ?? "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            riskLevel: value === "all" ? undefined : (value as RiskLevel),
          })
        }
      >
        <SelectTrigger id="transaction-risk-filter" className="w-full sm:w-[160px]">
          <SelectValue placeholder="Risk level" />
        </SelectTrigger>
        <SelectContent>
          {riskOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="text-muted-foreground gap-1.5"
        >
          <X className="size-3.5" />
          Clear
        </Button>
      )}
    </div>
  )
}
