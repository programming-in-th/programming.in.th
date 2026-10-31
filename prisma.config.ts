import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  // Not env(): `prisma generate` runs without a database URL in the Docker build.
  datasource: { url: process.env.DATABASE_URL }
})
