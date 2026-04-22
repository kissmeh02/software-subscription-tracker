import { describe, it, expect } from 'vitest'
import { createSubscriptionService } from './subscription-service.js'
import { InMemorySubscriptionStore } from './in-memory-subscription-store.js'
import { SubscriptionValidationError } from '../model/index.js'

describe('createSubscriptionService', () => {
  it('should add a subscription and list it', () => {
    const service = createSubscriptionService(new InMemorySubscriptionStore())
    const row = service.add({
      name: 'Tool',
      billingCycleMonths: 12,
      costPerCycle: 10,
      currency: 'USD',
      renewalDate: '2026-02-01',
      notes: '',
    })
    expect(row.id).toBeTruthy()
    expect(service.list()).toHaveLength(1)
  })

  it('should throw for invalid add payload', () => {
    const service = createSubscriptionService(new InMemorySubscriptionStore())
    expect(() =>
      service.add({
        name: '',
        billingCycleMonths: 12,
        costPerCycle: 0,
        currency: 'USD',
        renewalDate: '2026-02-01',
        notes: '',
      }),
    ).toThrow(SubscriptionValidationError)
  })
})
