import { Chart, registerables } from 'chart.js'
import { appState } from '../app-state.js'
import { convertForDisplay, toMonthly } from '../format.js'
import { requireElement } from '../dom.js'

Chart.register(...registerables)

/**
 * Renders the 12-month projected spend line chart. Destroys a previous instance if present.
 */
export function renderTrendChart(): void {
  const active = appState.subs.filter((s) => s.status === 'active')
  const monthlyTotal = active.reduce((a, s) => a + toMonthly(s.cost, s.cycle), 0)
  const converted = convertForDisplay(monthlyTotal, appState.currency)

  const labels: string[] = []
  const data: number[] = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    labels.push(d.toLocaleString('en-CA', { month: 'short', year: '2-digit' }))
    data.push(parseFloat(converted.toFixed(2)))
  }

  const canvas = requireElement<HTMLCanvasElement>('trendChart')
  const ctx = canvas.getContext('2d')
  if (ctx == null) return

  if (appState.trendChart) {
    appState.trendChart.destroy()
  }
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches
  const cur = appState.currency
  appState.trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `Monthly (${cur})`,
          data,
          borderColor: '#00e5ff',
          backgroundColor: 'rgba(0,229,255,0.07)',
          borderWidth: 2,
          pointBackgroundColor: '#00e5ff',
          pointRadius: 4,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
          ticks: { color: isDark ? '#6e6c66' : '#9e9d97', font: { size: 11 } },
        },
        y: {
          grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
          ticks: {
            color: isDark ? '#6e6c66' : '#9e9d97',
            font: { size: 11 },
            callback: (v) => `${cur} ${Number(v).toFixed(0)}`,
          },
        },
      },
    },
  })
}
