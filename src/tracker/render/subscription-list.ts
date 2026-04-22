import { appState } from '../app-state.js'
import { requireElement } from '../dom.js'
import { escapeHtml } from '../escape-html.js'
import { formatMoney, toMonthly, daysUntil, compareSubscriptionsByNextCharge } from '../format.js'
import type { Category, Currency, Status, Subscription } from '../types.js'

function subCardRow(s: Subscription, currency: Currency): string {
  const days = daysUntil(s.renewal)
  const soonBadge =
    s.status === 'active' && days !== null && days <= 14 && days >= 0
      ? `<span class="badge-soon">${days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days}d`}</span>`
      : ''
  const renewal = s.renewal
    ? `<span class="badge-date">${new Date(`${s.renewal}T00:00:00`).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>`
    : ''
  const notes = s.notes
    ? `<span class="badge-date" style="font-style:italic">${escapeHtml(s.notes)}</span>`
    : ''
  const mo = toMonthly(s.cost, s.cycle)
  const nameEsc = escapeHtml(s.name)
  const costLabel =
    s.cycle === 'annual'
      ? `${formatMoney(s.cost, currency)}<div class="sub-cost-cycle">/yr · ${formatMoney(mo, currency)}/mo</div>`
      : `${formatMoney(s.cost, currency)}<div class="sub-cost-cycle">/${s.cycle}</div>`

  const bg = s.cat === 'work' ? 'var(--work-bg)' : 'var(--personal-bg)'
  const titlePause = s.status === 'paused' ? 'Resume' : 'Pause'
  const pauseChar = s.status === 'paused' ? '▶' : '⏸'

  return `<div class="sub-card status-${s.status}">
    <div class="sub-icon" style="background:${bg}">${s.icon || '📦'}</div>
    <div>
      <div class="sub-name">${nameEsc}</div>
      <div class="sub-meta">
        <span class="badge badge-${s.cat}">${s.cat}</span>
        <span class="badge badge-${s.status}">${s.status}</span>
        ${renewal}${soonBadge}${notes}
      </div>
    </div>
    <div class="sub-cost"><div class="sub-cost-main">${costLabel}</div></div>
    <div class="sub-actions">
      <button type="button" class="icon-btn" data-list-action="edit" data-id="${s.id}" title="Edit">✏</button>
      <button type="button" class="icon-btn" data-list-action="toggle-pause" data-id="${s.id}" title="${titlePause}">${pauseChar}</button>
      <button type="button" class="icon-btn danger" data-list-action="delete" data-id="${s.id}" title="Delete">✕</button>
    </div>
  </div>`
}

/**
 * Renders the grouped subscription list with delegated click targets (`data-list-action` / `data-id`).
 */
export function renderSubscriptionList(): void {
  const q = requireElement<HTMLInputElement>('search').value.toLowerCase()
  const catF = requireElement<HTMLSelectElement>('filterCat').value
  const statusF = requireElement<HTMLSelectElement>('filterStatus').value
  const sortBy = requireElement<HTMLSelectElement>('sortBy').value
  const c = appState.currency

  const filtered = appState.subs.filter((s) => {
    if (q && !s.name.toLowerCase().includes(q) && !(s.notes || '').toLowerCase().includes(q)) {
      return false
    }
    if (catF && s.cat !== (catF as Category)) return false
    if (statusF && s.status !== (statusF as Status)) return false
    return true
  })

  filtered.sort((a, b) => {
    if (sortBy === 'cost-desc') return toMonthly(b.cost, b.cycle) - toMonthly(a.cost, a.cycle)
    if (sortBy === 'cost-asc') return toMonthly(a.cost, a.cycle) - toMonthly(b.cost, b.cycle)
    if (sortBy === 'renewal') return (a.renewal || '9999') > (b.renewal || '9999') ? 1 : -1
    if (sortBy === 'next-charge') return compareSubscriptionsByNextCharge(a, b)
    return a.name.localeCompare(b.name)
  })

  if (!filtered.length) {
    requireElement('list').innerHTML = '<div class="empty">No subscriptions found.</div>'
    return
  }

  const groups: Record<string, Subscription[]> = {}
  filtered.forEach((s) => {
    if (!groups[s.cat]) groups[s.cat] = []
    groups[s.cat]!.push(s)
  })

  let html = ''
  for (const [cat, items] of Object.entries(groups)) {
    const total = items
      .filter((s) => s.status === 'active')
      .reduce((a, s) => a + toMonthly(s.cost, s.cycle), 0)
    const catLabel = (cat as Category).charAt(0).toUpperCase() + (cat as string).slice(1)
    html += `<div class="section-label">${catLabel} · ${formatMoney(total, c)}/mo</div><div class="sub-list">`
    items.forEach((s) => {
      html += subCardRow(s, c)
    })
    html += '</div>'
  }
  requireElement('list').innerHTML = html
}
