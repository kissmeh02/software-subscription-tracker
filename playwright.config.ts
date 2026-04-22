import { defineConfig, devices } from '@playwright/test'

/** Match Vite’s default dev server (localhost is more reliable than 127.0.0.1 on some setups). */
const baseURL = 'http://localhost:5173'

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: { ...devices['Desktop Chrome'], baseURL },
  webServer: {
    /** Root base path so / matches (clear inherited VITE_BASE_PATH in dev). */
    command: 'npm run dev:e2e',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
