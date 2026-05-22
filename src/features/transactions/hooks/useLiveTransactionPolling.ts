"use client"

import { useCallback, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { showLiveTransactionToast } from "@/shared/components/feedback/LiveTransactionToast"
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
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const [lastEvent, setLastEvent] = useState<LiveFeedEvent | null>(null)

  const isActive = enabled && !!businessId

  const runTick = useCallback(() => {
    const transactions = getMutableTransactions()
    const event = simulateLiveFeedTick(transactions)

    setLastUpdatedAt(new Date())

    if (!event) return

    setLastEvent(event)
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] })
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })

    if (event.type === "flagged") {
      showLiveTransactionToast({ message: event.message, variant: "warning" })
    } else if (event.type === "new_transaction") {
      showLiveTransactionToast({ message: event.message, variant: "info" })
    }
  }, [queryClient])

  useEffect(() => {
    if (!isActive) return

    const initialTimeoutId = window.setTimeout(runTick, 0)
    const intervalId = window.setInterval(runTick, POLL_INTERVAL_MS)

    return () => {
      window.clearTimeout(initialTimeoutId)
      window.clearInterval(intervalId)
    }
  }, [isActive, runTick])

  return {
    isActive,
    lastUpdatedAt: isActive ? lastUpdatedAt : null,
    lastEvent: isActive ? lastEvent : null,
  }
}
