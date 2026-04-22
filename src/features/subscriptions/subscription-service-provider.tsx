import type { ReactNode } from 'react'
import { SubscriptionServiceContext } from './subscription-service-context.js'
import type { SubscriptionService } from './services/index.js'

type ProviderProps = {
  service: SubscriptionService
  children: ReactNode
}

/**
 * Delivers a {@link SubscriptionService} to hooks without a global singleton.
 */
export function SubscriptionServiceProvider({ service, children }: ProviderProps) {
  return (
    <SubscriptionServiceContext.Provider value={service}>{children}</SubscriptionServiceContext.Provider>
  )
}
