import { DEFAULT_CURRENCY, SUPPORTED_CURRENCY_CODES, type SupportedCurrency } from './supported-currency.js'

/**
 * @param amountDecimal - e.g. 9.99
 * @param currency - stored ISO 4217 code; falls back to {@link DEFAULT_CURRENCY} if unknown
 */
export function formatCurrency(amountDecimal: number, currency: string): string {
  const code: SupportedCurrency = SUPPORTED_CURRENCY_CODES.has(currency as SupportedCurrency)
    ? (currency as SupportedCurrency)
    : DEFAULT_CURRENCY
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: code,
  }).format(amountDecimal)
}
