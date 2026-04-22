import { describe, expect, it } from 'vitest'
import { BACKUP_FILE_VERSION, parseBackupJson, type BackupFileV1 } from './backup.js'
import { STORAGE_KEY } from './config.js'
import type { Subscription } from './types.js'

const minimalSub: Subscription = {
  id: 1,
  name: 'Test',
  cost: 1,
  cycle: 'monthly',
  cat: 'work',
  status: 'active',
  renewal: '2026-01-01',
  icon: '📦',
  notes: '',
}

describe('parseBackupJson', () => {
  it('should reject invalid JSON', () => {
    const r = parseBackupJson('{not json')
    expect(r.ok).toBe(false)
  })
  it('should accept a raw subscription array', () => {
    const r = parseBackupJson(JSON.stringify([minimalSub]))
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.subscriptions).toHaveLength(1)
  })
  it('should accept a v1 envelope', () => {
    const file: BackupFileV1 = {
      app: 'software-subscription-tracker',
      version: BACKUP_FILE_VERSION,
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      subscriptions: [minimalSub],
    }
    const r = parseBackupJson(JSON.stringify(file))
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.subscriptions[0]?.name).toBe('Test')
  })
})
