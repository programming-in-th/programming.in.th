import { existsSync } from 'node:fs'

import { defineConfig } from 'prisma/config'

// Prisma 7 no longer reads .env itself; the Docker build has none.
if (existsSync('.env')) process.loadEnvFile()

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  // Not env(): `prisma generate` runs without a database URL in the Docker build.
  datasource: { url: process.env.DATABASE_URL }
})
