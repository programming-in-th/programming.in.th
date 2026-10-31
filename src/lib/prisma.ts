import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '@/prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
