const CODES = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'JPY',
] as const

export type SupportedCurrency = (typeof CODES)[number]

/**
 * Whitelist to avoid invalid Intl currency codes; extend as product requirements grow.
 */
export const SUPPORTED_CURRENCY_CODES: ReadonlySet<SupportedCurrency> = new Set(CODES)

export const DEFAULT_CURRENCY: SupportedCurrency = 'USD'
