import type { Subscription } from '../model/index.js'

/**
 * In-memory persistence. Replace with HTTP + DB services when moving off localhost.
 * Thread-safe: not needed for a single main-thread SPA.
 */
export class InMemorySubscriptionStore {
  private readonly byId = new Map<string, Subscription>()

  list(): Subscription[] {
    return Array.from(this.byId.values())
  }

  getById(id: string): Subscription | undefined {
    return this.byId.get(id)
  }

  upsert(subscription: Subscription): void {
    this.byId.set(subscription.id, subscription)
  }

  delete(id: string): boolean {
    return this.byId.delete(id)
  }
}
