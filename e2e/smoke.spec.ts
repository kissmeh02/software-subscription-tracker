import { test, expect } from '@playwright/test'

test('add subscription flow', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Subscription Tracker' })).toBeVisible()
  await page.locator('[data-action="add-subscription"]').click()
  await expect(page.getByRole('dialog', { name: 'Add subscription' })).toBeVisible()
  await page.locator('#f-name').fill('E2E Test Sub')
  await page.locator('#f-cost').fill('1.99')
  await page.locator('[data-action="modal-save"]').click()
  await expect(page.getByText('E2E Test Sub', { exact: true })).toBeVisible()
})
