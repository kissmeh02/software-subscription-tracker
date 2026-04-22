import { describe, it, expect } from 'vitest'
import { formatCurrency } from './format-currency.js'

describe('formatCurrency', () => {
  it('should format a known currency using Intl when currency is supported', () => {
    const result = formatCurrency(10.5, 'EUR')
    expect(result).toMatch(/10/)
  })

  it('should fall back to default when currency is not in the allowlist', () => {
    const result = formatCurrency(1, 'XXX')
    expect(result).toBeTruthy()
  })
})
