---
name: api-development
description: Use when creating or modifying Elysia API routes. Ensures proper validation with t schema, auth guards, error handling, and performance patterns.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

API routes use [Elysia](https://elysiajs.com) with TypeBox validation:

```typescript
import { Elysia, t } from 'elysia'
import { prisma } from '@/lib/prisma'

const app = new Elysia()
  .get('/tasks/:id', async ({ params, query, status }) => {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
      select: { id: true, title: true }
    })
    if (!task) return status(404, { error: 'Not found' })
    return task
  }, {
    params: t.Object({ id: t.String() }),
    query: t.Object({
      limit: t.Optional(t.Numeric({ default: 10 }))
    })
  })
  .post('/tasks', async ({ body, status }) => {
    const task = await prisma.task.create({ data: body })
    return status(201, task)
  }, {
    body: t.Object({
      title: t.String({ minLength: 1 }),
      fullScore: t.Number({ minimum: 0 })
    })
  })
```

**Auth guard pattern**:
```typescript
.derive(async ({ headers, status }) => {
  const user = await getUser(headers.authorization)
  if (!user) return status(401, { error: 'Unauthorized' })
  return { user }
})
.get('/admin', ({ user, status }) => {
  if (!user.admin) return status(403, { error: 'Forbidden' })
  return 'admin only'
})
```

**Checklist**: `t.Object` validation, auth derive/guard, selective Prisma fields, pagination, `status()` for errors.
