import { describe, it, expect } from 'vitest'
import { assertValidSubscriptionInput } from './validate-subscription-input.js'
import { SubscriptionValidationError } from './subscription-errors.js'

const valid = {
  name: '  Test  ',
  billingCycleMonths: 12,
  costPerCycle: 0,
  currency: 'USD',
  renewalDate: '2026-01-15',
  notes: '',
} as const

describe('assertValidSubscriptionInput', () => {
  it('should accept a minimal valid input', () => {
    expect(() => assertValidSubscriptionInput({ ...valid, name: 'A' })).not.toThrow()
  })

  it('should throw when name is empty', () => {
    expect(() =>
      assertValidSubscriptionInput({ ...valid, name: '   ' }),
    ).toThrow(SubscriptionValidationError)
  })
})
