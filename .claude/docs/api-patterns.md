# API & Validation Patterns

## Validation Strategy

**Current**: Zod for validation
**Migration in progress**: Moving to Elysia with TypeBox (`t.*` schemas)

## Elysia Routes (Preferred)

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
    query: t.Object({ limit: t.Optional(t.Numeric()) })
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

## Legacy Next.js Routes (Zod)

```typescript
import { z } from 'zod'

const Schema = z.object({ title: z.string().min(1) })

const result = Schema.safeParse(input)
if (!result.success) {
  return Response.json({ error: 'Invalid input' }, { status: 400 })
}
```

## Error Responses

Use consistent HTTP status codes:
- `400` - Invalid input
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (logged in but not allowed)
- `404` - Not found
- `500` - Server error

**Never expose internal details** in error messages.

## Checklist

- [ ] Validation on all inputs (`t.Object` or Zod schema)
- [ ] Auth checks (see [auth-patterns.md](./auth-patterns.md))
- [ ] Selective Prisma fields (see [database-patterns.md](./database-patterns.md))
- [ ] Pagination for list endpoints
- [ ] Proper `status()` codes for errors
