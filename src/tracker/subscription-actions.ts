import { appState } from './app-state.js'
import { saveSubscriptions } from './storage.js'
import { renderDashboard } from './render/index.js'

export function togglePause(id: number): void {
  const s = appState.subs.find((x) => x.id === id)
  if (s == null || s.status === 'cancelled') return
  s.status = s.status === 'paused' ? 'active' : 'paused'
  saveSubscriptions()
  renderDashboard()
}

export function deleteSubscription(id: number): void {
  if (!globalThis.confirm?.('Remove this subscription?')) return
  appState.subs = appState.subs.filter((x) => x.id !== id)
  saveSubscriptions()
  renderDashboard()
}
