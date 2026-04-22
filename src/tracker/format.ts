import { CAD_USD } from './config.js'
import type { BillingCycle, Currency, Status, Subscription } from './types.js'

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

function statusRank(status: Status): number {
  if (status === 'active') return 0
  if (status === 'paused') return 1
  return 2
}

/**
 * Active first, then paused, then cancelled; within each group, soonest renewal (by `daysUntil`) first. Missing renewals last.
 */
export function compareSubscriptionsByNextCharge(a: Subscription, b: Subscription): number {
  const r = statusRank(a.status) - statusRank(b.status)
  if (r !== 0) return r
  const da = daysUntil(a.renewal)
  const db = daysUntil(b.renewal)
  if (da === null && db === null) return a.name.localeCompare(b.name)
  if (da === null) return 1
  if (db === null) return -1
  if (da !== db) return da - db
  return a.name.localeCompare(b.name)
}
