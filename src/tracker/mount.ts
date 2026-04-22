import { appState } from './app-state.js'
import { downloadBackup, normalizeSubscriptionIds, parseBackupJson } from './backup.js'
import { queryElement, requireElement } from './dom.js'
import { downloadSubscriptionsCsv } from './csv-export.js'
import { renderDashboard } from './render/index.js'
import { renderTrendChart } from './render/trend-chart.js'
import { loadSubscriptions, saveSubscriptions } from './storage.js'
import { deleteSubscription, togglePause } from './subscription-actions.js'
import {
  copyAllReminders,
  copyReminderText,
  closeRemindersModal,
  openRemindersModal,
} from './modals/reminders.js'
import {
  closeSubscriptionModal,
  openSubscriptionModal,
  saveSubscriptionFromForm,
} from './modals/subscription-form.js'
import type { Currency } from './types.js'

type Tab = 'overview' | 'trend'

function setCurrency(c: Currency): void {
  appState.currency = c
  document.querySelectorAll<HTMLButtonElement>('.currency-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.currency === c)
  })
  renderDashboard()
  const trendOpen = requireElement<HTMLElement>('tab-trend').classList.contains('active')
  if (trendOpen) {
    renderTrendChart()
  }
}

function setActiveTab(tab: Tab): void {
  document.querySelectorAll<HTMLButtonElement>('.tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tab)
  })
  requireElement<HTMLElement>('tab-overview').classList.toggle('active', tab === 'overview')
  requireElement<HTMLElement>('tab-trend').classList.toggle('active', tab === 'trend')
  if (tab === 'trend') {
    renderTrendChart()
  }
}

function onListClick(ev: MouseEvent): void {
  const t = (ev.target as HTMLElement).closest<HTMLButtonElement>('[data-list-action]')
  if (t == null) return
  const id = Number(t.dataset.id)
  if (Number.isNaN(id)) return
  const action = t.dataset.listAction
  if (action === 'edit') openSubscriptionModal(id)
  else if (action === 'toggle-pause') togglePause(id)
  else if (action === 'delete') deleteSubscription(id)
}

/**
 * Binds all DOM events and runs the first render.
 */
function syncCurrencyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-currency]').forEach((b) => {
    b.classList.toggle('active', b.dataset.currency === appState.currency)
  })
}

export function mountApp(): void {
  loadSubscriptions()
  syncCurrencyButtons()

  document.querySelectorAll<HTMLButtonElement>('[data-currency]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.currency as Currency | undefined
      if (c) setCurrency(c)
    })
  })

  queryElement<HTMLButtonElement>('[data-action="export-csv"]').addEventListener('click', downloadSubscriptionsCsv)
  queryElement<HTMLButtonElement>('[data-action="export-backup"]').addEventListener('click', () => {
    downloadBackup(appState.subs)
  })
  const importInput = requireElement<HTMLInputElement>('import-backup')
  queryElement<HTMLButtonElement>('[data-action="import-backup"]').addEventListener('click', () => {
    importInput.click()
  })
  importInput.addEventListener('change', (ev) => {
    const input = ev.target as HTMLInputElement
    const file = input.files?.[0]
    input.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? '')
      const res = parseBackupJson(text)
      if (!res.ok) {
        globalThis.alert?.(res.error)
        return
      }
      if (
        !globalThis.confirm?.(
          'Replace all subscriptions on this device with the backup? This cannot be undone.',
        )
      ) {
        return
      }
      appState.subs = normalizeSubscriptionIds(res.subscriptions)
      saveSubscriptions()
      renderDashboard()
    }
    reader.onerror = () => {
      globalThis.alert?.('Could not read that file.')
    }
    reader.readAsText(file, 'utf-8')
  })
  queryElement<HTMLButtonElement>('[data-action="reminders"]').addEventListener('click', openRemindersModal)
  queryElement<HTMLButtonElement>('[data-action="add-subscription"]').addEventListener('click', () => {
    openSubscriptionModal(null)
  })

  document.querySelectorAll<HTMLButtonElement>('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab as Tab | undefined
      if (tab) setActiveTab(tab)
    })
  })

  requireElement<HTMLInputElement>('search').addEventListener('input', () => {
    renderDashboard()
  })
  requireElement<HTMLSelectElement>('filterCat').addEventListener('change', () => {
    renderDashboard()
  })
  requireElement<HTMLSelectElement>('filterStatus').addEventListener('change', () => {
    renderDashboard()
  })
  requireElement<HTMLSelectElement>('sortBy').addEventListener('change', () => {
    renderDashboard()
  })

  requireElement<HTMLElement>('list').addEventListener('click', onListClick)

  queryElement<HTMLButtonElement>('[data-action="modal-cancel"]').addEventListener('click', closeSubscriptionModal)
  queryElement<HTMLButtonElement>('[data-action="modal-save"]').addEventListener('click', saveSubscriptionFromForm)
  requireElement<HTMLElement>('modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeSubscriptionModal()
  })
  const modalInner = requireElement<HTMLElement>('modal').querySelector('.modal')
  if (modalInner) modalInner.addEventListener('click', (e) => e.stopPropagation())

  queryElement<HTMLButtonElement>('[data-action="reminder-close"]').addEventListener('click', closeRemindersModal)
  queryElement<HTMLButtonElement>('[data-action="reminder-copy-all"]').addEventListener('click', copyAllReminders)
  requireElement<HTMLElement>('reminder-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeRemindersModal()
  })
  const reminderInner = requireElement<HTMLElement>('reminder-modal').querySelector('.modal')
  if (reminderInner) reminderInner.addEventListener('click', (e) => e.stopPropagation())

  requireElement<HTMLElement>('reminder-list').addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.reminder-item')
    if (item) copyReminderText(item)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSubscriptionModal()
      closeRemindersModal()
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      openSubscriptionModal(null)
    }
  })

  setActiveTab('overview')
  renderDashboard()
}
