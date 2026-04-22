import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, it, expect } from 'vitest'
import { createSubscriptionService } from '../services/subscription-service.js'
import { InMemorySubscriptionStore } from '../services/in-memory-subscription-store.js'
import { SubscriptionServiceProvider } from '../subscription-service-provider.js'
import { SubscriptionList } from './subscription-list.js'

function renderWithService(ui: ReactNode) {
  const service = createSubscriptionService(new InMemorySubscriptionStore(), {
    shouldSeedDefaults: true,
  })
  return render(
    <SubscriptionServiceProvider service={service}>{ui}</SubscriptionServiceProvider>,
  )
}

describe('SubscriptionList', () => {
  it('should show seeded subscription name in the list', () => {
    renderWithService(<SubscriptionList />)
    expect(screen.getByText('Editor Pro')).toBeInTheDocument()
  })
})
