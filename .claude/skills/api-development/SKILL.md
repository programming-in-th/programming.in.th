---
name: api-development
description: Use when creating or modifying Next.js API routes. Ensures proper Zod validation, auth checks, error handling, and performance patterns.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

API routes in `src/app/api/` must follow these patterns:

```typescript
import { z } from 'zod'
import { getServerUser } from '@/lib/session'
import { prisma } from '@/lib/prisma'

const Schema = z.object({ id: z.string(), limit: z.coerce.number().default(10) })

export async function GET(request: Request) {
  // 1. Auth check
  const user = await getServerUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  if (!user.admin) return Response.json({ error: 'Forbidden' }, { status: 403 })

  // 2. Validate input
  const result = Schema.safeParse(Object.fromEntries(new URL(request.url).searchParams))
  if (!result.success) return Response.json({ error: 'Invalid' }, { status: 400 })

  // 3. Query with selective fields + pagination
  const data = await prisma.task.findMany({
    where: { private: false },
    select: { id: true, title: true },
    take: result.data.limit
  })

  return Response.json(data)
}
```

**Checklist**: Zod validation, auth check, selective fields, pagination, consistent errors (400/401/403/404/500).
