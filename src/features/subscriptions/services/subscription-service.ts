import {
  type Subscription,
  type SubscriptionInput,
  assertValidSubscriptionInput,
  applyValidatedPatch,
} from '../model/index.js'
import { InMemorySubscriptionStore } from './in-memory-subscription-store.js'

const defaultSeed: readonly Subscription[] = [
  {
    id: 'seed-1',
    name: 'Editor Pro',
    billingCycleMonths: 12,
    costPerCycle: 99,
    currency: 'USD',
    renewalDate: '2026-12-01',
    notes: 'Example row — remove after connecting real data.',
  },
]

export type CreateSubscriptionServiceOptions = {
  /** When true, inserts demo data if those IDs are missing. */
  shouldSeedDefaults?: boolean
}

/**
 * Coordinates validation and the backing store. No UI or React imports.
 * @param store - injectable for tests; defaults to a new in-memory store
 */
export function createSubscriptionService(
  store: InMemorySubscriptionStore = new InMemorySubscriptionStore(),
  options: CreateSubscriptionServiceOptions = {},
) {
  if (options.shouldSeedDefaults) {
    for (const row of defaultSeed) {
      if (store.getById(row.id) == null) {
        store.upsert(row)
      }
    }
  }

  return {
    list(): Subscription[] {
      return store.list()
    },
    add(input: SubscriptionInput): Subscription {
      assertValidSubscriptionInput(input)
      const sub: Subscription = {
        id: globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}`,
        name: input.name,
        billingCycleMonths: input.billingCycleMonths,
        costPerCycle: input.costPerCycle,
        currency: input.currency,
        renewalDate: input.renewalDate,
        notes: input.notes,
      }
      store.upsert(sub)
      return sub
    },
    update(id: string, input: SubscriptionInput): Subscription {
      const existing = store.getById(id)
      if (existing == null) {
        throw new Error(`Subscription not found: ${id}`)
      }
      const next = applyValidatedPatch(existing, input)
      store.upsert(next)
      return next
    },
    remove(id: string): boolean {
      return store.delete(id)
    },
  }
}

export type SubscriptionService = ReturnType<typeof createSubscriptionService>
