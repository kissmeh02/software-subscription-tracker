import { RANDOM_ICONS } from '../config.js'
import { appState } from '../app-state.js'
import { requireElement } from '../dom.js'
import { saveSubscriptions } from '../storage.js'
import { renderDashboard } from '../render/index.js'
import type { Subscription } from '../types.js'

export function openSubscriptionModal(id: number | null): void {
  appState.editId = id
  const s = id != null ? appState.subs.find((x) => x.id === id) : undefined
  requireElement('modal-title').textContent = s != null ? 'Edit subscription' : 'Add subscription'
  requireElement<HTMLInputElement>('f-name').value = s?.name ?? ''
  requireElement<HTMLInputElement>('f-cost').value = s != null ? String(s.cost) : ''
  requireElement<HTMLSelectElement>('f-cycle').value = s?.cycle ?? 'monthly'
  requireElement<HTMLSelectElement>('f-cat').value = s?.cat ?? 'work'
  requireElement<HTMLSelectElement>('f-status').value = s?.status ?? 'active'
  requireElement<HTMLInputElement>('f-renewal').value = s?.renewal ?? ''
  requireElement<HTMLInputElement>('f-icon').value = s?.icon ?? ''
  requireElement<HTMLInputElement>('f-notes').value = s?.notes ?? ''
  requireElement<HTMLElement>('modal').style.display = 'flex'
  setTimeout(() => requireElement<HTMLInputElement>('f-name').focus(), 50)
}

export function closeSubscriptionModal(): void {
  requireElement<HTMLElement>('modal').style.display = 'none'
  appState.editId = null
}

export function saveSubscriptionFromForm(): void {
  const name = requireElement<HTMLInputElement>('f-name').value.trim()
  const cost = parseFloat(requireElement<HTMLInputElement>('f-cost').value)
  if (!name || Number.isNaN(cost) || cost < 0) {
    globalThis.alert?.('Please enter a valid name and cost.')
    return
  }
  const iconRaw = requireElement<HTMLInputElement>('f-icon').value.trim()
  const sub: Subscription = {
    id: appState.editId ?? Date.now(),
    name,
    cost,
    cycle: requireElement<HTMLSelectElement>('f-cycle').value as Subscription['cycle'],
    cat: requireElement<HTMLSelectElement>('f-cat').value as Subscription['cat'],
    status: requireElement<HTMLSelectElement>('f-status').value as Subscription['status'],
    renewal: requireElement<HTMLInputElement>('f-renewal').value || null,
    icon: iconRaw || RANDOM_ICONS[Math.floor(Math.random() * RANDOM_ICONS.length)]!,
    notes: requireElement<HTMLInputElement>('f-notes').value.trim(),
  }
  if (appState.editId != null) {
    const i = appState.subs.findIndex((x) => x.id === appState.editId)
    if (i >= 0) appState.subs[i] = sub
  } else {
    appState.subs.push(sub)
  }
  saveSubscriptions()
  closeSubscriptionModal()
  renderDashboard()
}
