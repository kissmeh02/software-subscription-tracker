import { createContext } from 'react'
import type { SubscriptionService } from './services/index.js'

export const SubscriptionServiceContext = createContext<SubscriptionService | null>(null)
