import { describe, it, expect } from 'vitest'
import { daysUntil, toMonthly } from './format.js'

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
