import { defineConfig } from 'vite'

const repoBase = process.env.VITE_BASE_PATH

export default defineConfig({
  base: repoBase && repoBase.length > 0 ? ensureTrailingSlash(repoBase) : '/',
})

function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`
}
