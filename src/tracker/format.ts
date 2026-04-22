import { CAD_USD } from './config.js'
import type { BillingCycle, Currency } from './types.js'

export function toMonthly(cost: number, cycle: BillingCycle): number {
  if (cycle === 'annual') return cost / 12
  if (cycle === 'weekly') return cost * 4.33
  return cost
}

export function convertForDisplay(n: number, currency: Currency): number {
  return currency === 'USD' ? n * CAD_USD : n
}

export function formatMoney(n: number, currency: Currency): string {
  const v = convertForDisplay(n, currency)
  return v.toLocaleString('en-CA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  })
}

export function daysUntil(isoDate: string | null): number | null {
  if (!isoDate) return null
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const d = new Date(`${isoDate}T00:00:00`)
  d.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - now.getTime()) / 86400000)
}
