import { CAT_CHART_COLORS } from '../config.js'
import { appState } from '../app-state.js'
import { formatMoney, toMonthly, daysUntil } from '../format.js'
import type { Category } from '../types.js'
import { requireElement } from '../dom.js'
import { escapeHtml } from '../escape-html.js'

export function renderOverviewCharts(): void {
  const active = appState.subs.filter((s) => s.status === 'active')
  const c = appState.currency

  const byCat: Partial<Record<Category, number>> = {}
  active.forEach((s) => {
    byCat[s.cat] = (byCat[s.cat] ?? 0) + toMonthly(s.cost, s.cycle)
  })
  const maxCat = Math.max(...Object.values(byCat), 0.01)
  const catBars = Object.entries(byCat)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, val]) => {
      const label = (cat as string).charAt(0).toUpperCase() + (cat as string).slice(1)
      const col = CAT_CHART_COLORS[cat as Category] ?? '#888'
      return `
    <div class="bar-row">
      <div class="bar-label">${label}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${((val / maxCat) * 100).toFixed(1)}%;background:${col}"></div></div>
      <div class="bar-val">${formatMoney(val, c)}</div>
    </div>`
    })
    .join('')

  const topSpend = [...active].sort((a, b) => toMonthly(b.cost, b.cycle) - toMonthly(a.cost, a.cycle)).slice(0, 5)
  const maxSpend = toMonthly(topSpend[0]?.cost ?? 1, topSpend[0]?.cycle ?? 'monthly')
  const spendBars = topSpend
    .map((s) => {
      const mo = toMonthly(s.cost, s.cycle)
      return `<div class="bar-row">
      <div class="bar-label">${s.icon || '📦'} ${escapeHtml(s.name)}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${((mo / maxSpend) * 100).toFixed(1)}%;background:#7b5af5"></div></div>
      <div class="bar-val">${formatMoney(mo, c)}</div>
    </div>`
    })
    .join('')

  const upcoming = active
    .filter((s) => s.renewal)
    .map((s) => ({ ...s, days: daysUntil(s.renewal) }))
    .filter((s) => s.days !== null && s.days >= 0)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))
    .slice(0, 5)

  const renewalRows = upcoming.length
    ? upcoming
        .map((s) => {
          const d = s.days ?? 0
          const label = d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : `${d}d`
          const cls = d <= 14 ? 'days-urgent' : 'days-ok'
          return `
    <div class="renewal-row">
      <div class="renewal-name">${s.icon || '📦'} ${escapeHtml(s.name)}</div>
      <span class="renewal-days ${cls}">${label}</span>
    </div>`
        })
        .join('')
    : '<div style="font-size:0.78rem;color:var(--text3);padding:8px 0">No upcoming renewals</div>'

  const noData = '<div style="font-size:0.78rem;color:var(--text3)">No data</div>'

  requireElement('charts').innerHTML = `
    <div>
      <div class="chart-card" style="margin-bottom:12px">
        <div class="chart-card-title">Spend by category</div>${catBars || noData}
      </div>
      <div class="chart-card">
        <div class="chart-card-title">Top spenders (monthly)</div>${spendBars || noData}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-card-title">Upcoming renewals</div>
      ${renewalRows}
    </div>
  `
}
