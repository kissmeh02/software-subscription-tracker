import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { compareSubscriptionsByNextCharge, daysUntil, toMonthly } from './format.js'
import type { Subscription } from './types.js'

describe('toMonthly', () => {
  it('should annualize to monthly', () => {
    expect(toMonthly(120, 'annual')).toBeCloseTo(10, 4)
  })
  it('should pass through monthly', () => {
    expect(toMonthly(9.99, 'monthly')).toBe(9.99)
  })
})

describe('daysUntil', () => {
  it('should return null for null input', () => {
    expect(daysUntil(null)).toBeNull()
  })
})

const sub = (o: Partial<Subscription> & Pick<Subscription, 'name'>): Subscription => ({
  id: 1,
  cost: 1,
  cycle: 'monthly',
  cat: 'work',
  status: o.status ?? 'active',
  renewal: o.renewal ?? '2026-04-20',
  icon: 'x',
  notes: '',
  ...o,
})

describe('compareSubscriptionsByNextCharge', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-20T12:00:00.000Z'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should put active before paused when renewals are equal', () => {
    const a = sub({ name: 'A', status: 'active', renewal: '2026-04-25' })
    const b = sub({ name: 'B', status: 'paused', renewal: '2026-04-25' })
    expect(compareSubscriptionsByNextCharge(a, b)).toBeLessThan(0)
  })
  it('should order by days until when status matches', () => {
    const later = sub({ name: 'Later', renewal: '2026-04-30' })
    const sooner = sub({ name: 'Sooner', renewal: '2026-04-24' })
    expect(compareSubscriptionsByNextCharge(later, sooner)).toBeGreaterThan(0)
  })
})
