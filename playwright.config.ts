import { defineConfig } from '@playwright/test'

const baseURL = process.env.BASE_URL || 'http://localhost:3000'

export default defineConfig({
  testDir: 'tests',
  webServer: process.env.CI
    ? undefined
    : {
        command: 'pnpm run dev',
        url: baseURL,
        reuseExistingServer: true
      },
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL
  }
})
