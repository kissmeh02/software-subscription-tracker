import { renderMetrics } from './metrics.js'
import { renderOverviewCharts } from './overview-charts.js'
import { renderSubscriptionList } from './subscription-list.js'

/**
 * Refreshes metrics, overview charts, and the subscription list (not the trend chart).
 */
export function renderDashboard(): void {
  renderMetrics()
  renderOverviewCharts()
  renderSubscriptionList()
}
