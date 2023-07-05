import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'json']
    },
    include: ['src/**/*.spec.{ts,tsx}']
  }
})
