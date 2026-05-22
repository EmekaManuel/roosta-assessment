"use client"

import { useState } from "react"
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
import type { TransactionFilter } from "../schemas"
import type { RiskLevel, TransactionStatus } from "../types"

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

interface TransactionFilterBarProps {
  filters: TransactionFilter
  onFiltersChange: (filters: TransactionFilter) => void
  onPageReset: () => void
}

export function TransactionFilterBar({
  filters,
  onFiltersChange,
  onPageReset,
}: TransactionFilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? "")

  const hasActiveFilters = !!(filters.status || filters.riskLevel || filters.search)

  function applyFilters(next: TransactionFilter) {
    onFiltersChange(next)
    onPageReset()
  }

  function handleSearchSubmit() {
    applyFilters({ ...filters, search: searchInput.trim() || undefined })
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-0 w-full sm:max-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          id="transaction-search"
          placeholder="Search by customer or reference..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchSubmit()
          }}
          onBlur={handleSearchSubmit}
          className="pl-9"
        />
      </div>

      <Select
        value={filters.status ?? "all"}
        onValueChange={(value) =>
          applyFilters({
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
          applyFilters({
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
          onClick={() => {
            setSearchInput("")
            applyFilters({})
          }}
          className="text-muted-foreground gap-1.5"
        >
          <X className="size-3.5" />
          Clear
        </Button>
      )}
    </div>
  )
}
