import type { Category } from './types.js'

export const STORAGE_KEY = 'subtrkr-v2'

export const CAD_USD = 0.73

export const RANDOM_ICONS = [
  '📦',
  '🛠',
  '📊',
  '🎬',
  '🎵',
  '💬',
  '📧',
  '🔐',
  '🖥',
  '🎨',
  '📝',
  '🔧',
  '📱',
  '🌐',
  '🤖',
  '📷',
] as const

export const CAT_CHART_COLORS: Record<Category, string> = {
  work: '#1a7fcb',
  personal: '#18a05a',
}
