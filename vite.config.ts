import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const repoBase = process.env.VITE_BASE_PATH

export default defineConfig({
  /**
   * GitHub project Pages live under /repo-name/; set VITE_BASE_PATH in CI to match.
   * Local dev uses root unless you override in .env.local.
   */
  base: repoBase && repoBase.length > 0 ? ensureTrailingSlash(repoBase) : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})

function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`
}
