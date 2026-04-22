import { useCallback, useEffect, useState } from 'react'
import { SubscriptionValidationError, type Subscription } from '../model/index.js'
import { useSubscriptionService } from './use-subscription-service.js'

type State = {
  items: Subscription[]
  error: string | null
}

const initial: State = { items: [], error: null }

/**
 * Loads the subscription list and wires CRUD without leaking service details to the tree.
 */
export function useSubscriptionList() {
  const service = useSubscriptionService()
  const [state, setState] = useState<State>(initial)

  const refresh = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, items: service.list() }))
  }, [service])

  useEffect(() => {
    refresh()
  }, [refresh])

  const remove = useCallback(
    (id: string) => {
      try {
        if (!service.remove(id)) {
          setState((prev) => ({ ...prev, error: 'Could not remove that subscription.' }))
          return
        }
        refresh()
      } catch (error) {
        setState((prev) => ({ ...prev, error: toUserMessage(error) }))
      }
    },
    [refresh, service],
  )

  return { ...state, refresh, remove }
}

function toUserMessage(error: unknown): string {
  if (error instanceof SubscriptionValidationError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}
