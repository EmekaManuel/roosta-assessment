"use client"

import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { getMutableTransactions } from "../api/dummy"
import { simulateLiveFeedTick, type LiveFeedEvent } from "../lib/live-feed-simulator"

const POLL_INTERVAL_MS = 12_000

interface UseLiveTransactionPollingOptions {
  businessId: string
  enabled?: boolean
}

export function useLiveTransactionPolling({
  businessId,
  enabled = true,
}: UseLiveTransactionPollingOptions) {
  const queryClient = useQueryClient()
  const [isActive, setIsActive] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const [lastEvent, setLastEvent] = useState<LiveFeedEvent | null>(null)

  useEffect(() => {
    if (!enabled || !businessId) return

    setIsActive(true)
    setLastUpdatedAt(new Date())

    const intervalId = window.setInterval(() => {
      const transactions = getMutableTransactions()
      const event = simulateLiveFeedTick(transactions)

      setLastUpdatedAt(new Date())

      if (!event) return

      setLastEvent(event)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })

      if (event.type === "flagged") {
        toast.warning(event.message, { duration: 5000 })
      } else if (event.type === "new_transaction") {
        toast.info(event.message, { duration: 4000 })
      }
    }, POLL_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
      setIsActive(false)
    }
  }, [businessId, enabled, queryClient])

  return { isActive, lastUpdatedAt, lastEvent }
}
