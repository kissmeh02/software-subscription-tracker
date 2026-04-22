import type { Subscription } from './types.js'

function offsetDate(days: number): string {
  const dt = new Date()
  dt.setDate(dt.getDate() + days)
  return dt.toISOString().split('T')[0] as string
}

/**
 * Seeded rows for first-time visitors (not persisted until first write).
 */
export function buildDefaultSubscriptions(): Subscription[] {
  const d = (n: number) => offsetDate(n)
  return [
    { id: 1, name: 'Figma', cost: 15, cycle: 'monthly', cat: 'work', status: 'active', renewal: d(5), icon: '🎨', notes: 'Design team' },
    { id: 2, name: 'Slack', cost: 7.25, cycle: 'monthly', cat: 'work', status: 'active', renewal: d(14), icon: '💬', notes: '' },
    { id: 3, name: 'GitHub', cost: 4, cycle: 'monthly', cat: 'work', status: 'active', renewal: d(22), icon: '🐙', notes: 'Pro plan' },
    { id: 4, name: '1Password', cost: 2.99, cycle: 'monthly', cat: 'work', status: 'active', renewal: d(8), icon: '🔐', notes: '' },
    { id: 5, name: 'Netflix', cost: 15.99, cycle: 'monthly', cat: 'personal', status: 'active', renewal: d(18), icon: '🎬', notes: '' },
    { id: 6, name: 'Spotify', cost: 10.99, cycle: 'monthly', cat: 'personal', status: 'paused', renewal: d(30), icon: '🎵', notes: '' },
    { id: 7, name: 'Adobe CC', cost: 599, cycle: 'annual', cat: 'work', status: 'active', renewal: d(45), icon: '🖥', notes: 'Creative Cloud all apps' },
    { id: 8, name: 'Notion', cost: 8, cycle: 'monthly', cat: 'work', status: 'cancelled', renewal: d(-5), icon: '📝', notes: '' },
  ]
}
