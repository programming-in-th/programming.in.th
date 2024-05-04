import { defineConfig } from '@playwright/test'

const baseURL = process.env.BASE_URL || 'http://localhost:3000'

export default defineConfig({
  testDir: 'tests',
  webServer: undefined,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL
  }
})
