import { STORAGE_KEY } from './config.js'
import { appState } from './app-state.js'
import type { Subscription } from './types.js'
import { buildDefaultSubscriptions } from './default-data.js'

/**
 * Loads subscriptions from `localStorage` or seeds with demo data.
 */
export function loadSubscriptions(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      appState.subs = JSON.parse(raw) as Subscription[]
      return
    }
  } catch {
    // Corrupt data — fall through to default
  }
  appState.subs = buildDefaultSubscriptions()
}

export function saveSubscriptions(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.subs))
  } catch {
    // Quota or private mode; ignore
  }
}
