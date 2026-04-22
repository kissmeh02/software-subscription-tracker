import { STORAGE_KEY } from './config.js'
import type { BillingCycle, Category, Status, Subscription } from './types.js'

const BACKUP_APP = 'software-subscription-tracker' as const
export const BACKUP_FILE_VERSION = 1 as const

export type BackupFileV1 = {
  app: typeof BACKUP_APP
  version: typeof BACKUP_FILE_VERSION
  exportedAt: string
  storageKey: string
  subscriptions: Subscription[]
}

function isBillingCycle(v: unknown): v is BillingCycle {
  return v === 'monthly' || v === 'annual' || v === 'weekly'
}

function isCategory(v: unknown): v is Category {
  return v === 'work' || v === 'personal'
}

function isStatus(v: unknown): v is Status {
  return v === 'active' || v === 'paused' || v === 'cancelled'
}

function isSubscriptionRow(v: unknown): v is Subscription {
  if (v == null || typeof v !== 'object' || Array.isArray(v)) return false
  const o = v as Record<string, unknown>
  if (typeof o.id !== 'number' || !Number.isFinite(o.id)) return false
  if (typeof o.name !== 'string' || o.name.length === 0) return false
  if (typeof o.cost !== 'number' || !Number.isFinite(o.cost) || o.cost < 0) return false
  if (!isBillingCycle(o.cycle)) return false
  if (!isCategory(o.cat)) return false
  if (!isStatus(o.status)) return false
  if (o.renewal != null && typeof o.renewal !== 'string') return false
  if (typeof o.icon !== 'string') return false
  if (typeof o.notes !== 'string') return false
  return true
}

/**
 * Renumbers `id` to 1..n in array order to avoid duplicate ids after merge/imports.
 */
export function normalizeSubscriptionIds(subs: Subscription[]): Subscription[] {
  return subs.map((s, i) => ({ ...s, id: i + 1 }))
}

/**
 * Triggers a JSON download of the current subscription list (full backup for `localStorage`).
 */
export function downloadBackup(subs: Subscription[]): void {
  const payload: BackupFileV1 = {
    app: BACKUP_APP,
    version: BACKUP_FILE_VERSION,
    exportedAt: new Date().toISOString(),
    storageKey: STORAGE_KEY,
    subscriptions: subs,
  }
  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const a = document.createElement('a')
  const day = new Date().toISOString().slice(0, 10)
  a.href = URL.createObjectURL(blob)
  a.download = `subscription-tracker-backup-${day}.json`
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 2000)
}

export function parseBackupJson(
  text: string,
):
  | { ok: true; subscriptions: Subscription[] }
  | { ok: false; error: string } {
  let parsed: unknown
  try {
    parsed = JSON.parse(text) as unknown
  } catch {
    return { ok: false, error: 'This file is not valid JSON.' }
  }
  if (Array.isArray(parsed)) {
    if (!parsed.every(isSubscriptionRow)) {
      return { ok: false, error: 'Backup array is missing required fields or has invalid values.' }
    }
    return { ok: true, subscriptions: parsed }
  }
  if (parsed == null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, error: 'Unrecognized backup format.' }
  }
  const o = parsed as Record<string, unknown>
  if (o.app === BACKUP_APP && o.version === BACKUP_FILE_VERSION) {
    const subs = o.subscriptions
    if (!Array.isArray(subs) || !subs.every(isSubscriptionRow)) {
      return { ok: false, error: 'Backup subscriptions are missing or invalid.' }
    }
    return { ok: true, subscriptions: subs }
  }
  if (o.version === 1 && Array.isArray(o.subscriptions) && o.subscriptions.every(isSubscriptionRow)) {
    return { ok: true, subscriptions: o.subscriptions }
  }
  return { ok: false, error: 'Unrecognized backup format. Expected app export or a raw subscription array.' }
}
