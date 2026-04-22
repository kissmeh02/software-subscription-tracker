import { useContext } from 'react'
import { SubscriptionServiceContext } from '../subscription-service-context.js'
import type { SubscriptionService } from '../services/index.js'

/**
 * @throws if used outside of `SubscriptionServiceProvider`
 */
export function useSubscriptionService(): SubscriptionService {
  const value = useContext(SubscriptionServiceContext)
  if (value == null) {
    throw new Error('useSubscriptionService must be used within SubscriptionServiceProvider')
  }
  return value
}
