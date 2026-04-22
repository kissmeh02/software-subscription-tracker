import { appState } from '../app-state.js'
import { requireElement } from '../dom.js'
import { escapeHtml } from '../escape-html.js'
import { formatMoney, toMonthly, daysUntil } from '../format.js'

export function openRemindersModal(): void {
  const active = appState.subs.filter((s) => s.status === 'active' && s.renewal)
  const sorted = active
    .map((s) => ({ ...s, days: daysUntil(s.renewal) }))
    .filter((s) => s.days !== null && s.days >= 0)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))
  const c = appState.currency

  if (!sorted.length) {
    requireElement('reminder-list').innerHTML =
      '<div style="font-size:0.8rem;color:var(--text3)">No active subscriptions with renewal dates.</div>'
  } else {
    requireElement('reminder-list').innerHTML = sorted
      .map((s) => {
        const dateStr = new Date(`${s.renewal}T00:00:00`).toLocaleDateString('en-CA', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        const cost = formatMoney(toMonthly(s.cost, s.cycle), c)
        const when =
          s.days === 0 ? 'today' : s.days === 1 ? 'tomorrow' : `${s.days} days`
        return `<div class="reminder-item" data-reminder-copy="1" title="Click to copy">📅 ${escapeHtml(s.name)} renews on ${dateStr} — ${cost}/${s.cycle === 'annual' ? 'yr' : 'mo'} (${when})</div>`
      })
      .join('')
  }
  requireElement<HTMLElement>('reminder-modal').style.display = 'flex'
}

export function copyReminderText(el: HTMLElement): void {
  const text = el.textContent?.trim() ?? ''
  void globalThis.navigator.clipboard.writeText(text).then(() => {
    const orig = el.style.background
    el.style.background = 'var(--accent-dim)'
    setTimeout(() => {
      el.style.background = orig
    }, 600)
  })
}

export function copyAllReminders(): void {
  const texts = [...document.querySelectorAll<HTMLElement>('.reminder-item')]
    .map((el) => el.textContent?.trim() ?? '')
    .join('\n')
  void globalThis.navigator.clipboard.writeText(texts).then(() => {
    globalThis.alert?.('Copied all reminders to clipboard!')
  })
}

export function closeRemindersModal(): void {
  requireElement<HTMLElement>('reminder-modal').style.display = 'none'
}
