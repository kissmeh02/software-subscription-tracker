import { appState } from '../app-state.js'
import { formatMoney, toMonthly } from '../format.js'
import { daysUntil } from '../format.js'
import { requireElement } from '../dom.js'

export function renderMetrics(): void {
  const active = appState.subs.filter((s) => s.status === 'active')
  const monthly = active.reduce((a, s) => a + toMonthly(s.cost, s.cycle), 0)
  const annual = monthly * 12
  const work = active.filter((s) => s.cat === 'work').reduce((a, s) => a + toMonthly(s.cost, s.cycle), 0)
  const personal = active
    .filter((s) => s.cat === 'personal')
    .reduce((a, s) => a + toMonthly(s.cost, s.cycle), 0)
  const soon = active.filter((s) => {
    const d = daysUntil(s.renewal)
    return d !== null && d <= 14 && d >= 0
  }).length
  const total = appState.subs.length
  const c = appState.currency

  requireElement('metrics').innerHTML = `
    <div class="metric"><div class="metric-label">Monthly spend</div><div class="metric-value">${formatMoney(monthly, c)}</div><div class="metric-sub">active only</div></div>
    <div class="metric"><div class="metric-label">Annual spend</div><div class="metric-value">${formatMoney(annual, c)}</div><div class="metric-sub">projected</div></div>
    <div class="metric"><div class="metric-label">Work</div><div class="metric-value">${formatMoney(work, c)}</div><div class="metric-sub">/mo · ${active.filter((s) => s.cat === 'work').length} active</div></div>
    <div class="metric"><div class="metric-label">Personal</div><div class="metric-value">${formatMoney(personal, c)}</div><div class="metric-sub">/mo · ${active.filter((s) => s.cat === 'personal').length} active</div></div>
    <div class="metric ${soon > 0 ? 'metric-warn' : ''}"><div class="metric-label">Renewing soon</div><div class="metric-value">${soon}</div><div class="metric-sub">within 14 days</div></div>
    <div class="metric"><div class="metric-label">Total tracked</div><div class="metric-value">${total}</div><div class="metric-sub">${appState.subs.filter((s) => s.status === 'cancelled').length} cancelled</div></div>
  `
}
