/** Supported billing period lengths in months. */
export type BillingCycleMonths = 1 | 3 | 6 | 12

/**
 * A row representing one recurring software subscription. IDs are client-generated
 * (UUID) until a backend provides canonical identifiers.
 */
export type Subscription = {
  readonly id: string
  name: string
  /** Whole billing period, e.g. 12 for yearly */
  billingCycleMonths: BillingCycleMonths
  costPerCycle: number
  currency: string
  /** ISO date-only string, YYYY-MM-DD */
  renewalDate: string
  notes: string
}

export type SubscriptionInput = Pick<
  Subscription,
  'name' | 'billingCycleMonths' | 'costPerCycle' | 'currency' | 'renewalDate' | 'notes'
>
