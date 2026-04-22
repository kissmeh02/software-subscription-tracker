import type { Chart } from 'chart.js'
import type { Currency, Subscription } from './types.js'

export const appState = {
  subs: [] as Subscription[],
  currency: 'CAD' as Currency,
  editId: null as number | null,
  trendChart: null as Chart | null,
}
