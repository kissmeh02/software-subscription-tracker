import { appState } from './app-state.js'
import { toMonthly } from './format.js'

export function downloadSubscriptionsCsv(): void {
  const rows: (string | number)[][] = [
    ['Name', 'Category', 'Status', 'Cost', 'Cycle', 'Monthly (CAD)', 'Renewal', 'Notes'],
  ]
  appState.subs.forEach((s) => {
    rows.push([
      s.name,
      s.cat,
      s.status,
      s.cost,
      s.cycle,
      toMonthly(s.cost, s.cycle).toFixed(2),
      s.renewal ?? '',
      s.notes ?? '',
    ])
  })
  const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'subscriptions.csv'
  a.click()
  URL.revokeObjectURL(url)
}
