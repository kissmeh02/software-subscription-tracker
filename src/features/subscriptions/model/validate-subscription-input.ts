import { SUPPORTED_CURRENCY_CODES, type SupportedCurrency } from '../../../lib/supported-currency.js'
import type { BillingCycleMonths, Subscription, SubscriptionInput } from './subscription.js'
import { SubscriptionValidationError } from './subscription-errors.js'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const MAX_NAME = 120
const MAX_NOTES = 2000
const BILLING_CYCLES = new Set<BillingCycleMonths>([1, 3, 6, 12])

/**
 * Verifies a subscription input before storage or create operations.
 * @param input - partial fields from a form; throws {@link SubscriptionValidationError} on failure
 */
export function assertValidSubscriptionInput(input: SubscriptionInput): void {
  const name = input.name?.trim() ?? ''
  if (name.length === 0) {
    throw new SubscriptionValidationError('Name is required.', { field: 'name' })
  }
  if (name.length > MAX_NAME) {
    throw new SubscriptionValidationError(`Name must be at most ${MAX_NAME} characters.`, {
      field: 'name',
    })
  }
  if (!BILLING_CYCLES.has(input.billingCycleMonths)) {
    throw new SubscriptionValidationError('Select a valid billing period.', { field: 'billingCycleMonths' })
  }
  if (!Number.isFinite(input.costPerCycle) || input.costPerCycle < 0) {
    throw new SubscriptionValidationError('Cost must be a non-negative number.', { field: 'costPerCycle' })
  }
  if (!SUPPORTED_CURRENCY_CODES.has(input.currency as SupportedCurrency)) {
    throw new SubscriptionValidationError('Unsupported currency.', { field: 'currency' })
  }
  if (!ISO_DATE.test(input.renewalDate)) {
    throw new SubscriptionValidationError('Renewal must be a YYYY-MM-DD date.', { field: 'renewalDate' })
  }
  const parsed = new Date(`${input.renewalDate}T00:00:00.000Z`)
  if (Number.isNaN(parsed.getTime())) {
    throw new SubscriptionValidationError('Renewal is not a valid date.', { field: 'renewalDate' })
  }
  if ((input.notes?.length ?? 0) > MAX_NOTES) {
    throw new SubscriptionValidationError(`Notes are limited to ${MAX_NOTES} characters.`, { field: 'notes' })
  }
}

/**
 * Merges updates onto an existing subscription with validation. Used for partial edits.
 * @param existing - the stored row
 * @param update - new field values; must include all keys from SubscriptionInput
 */
export function applyValidatedPatch(existing: Subscription, update: SubscriptionInput): Subscription {
  const candidate: Subscription = {
    ...existing,
    ...update,
  }
  assertValidSubscriptionInput({
    name: candidate.name,
    billingCycleMonths: candidate.billingCycleMonths,
    costPerCycle: candidate.costPerCycle,
    currency: candidate.currency,
    renewalDate: candidate.renewalDate,
    notes: candidate.notes,
  })
  return candidate
}
