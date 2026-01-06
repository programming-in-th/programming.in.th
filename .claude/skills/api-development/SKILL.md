---
name: api-development
description: Use when creating or modifying Next.js API routes. Ensures proper Zod validation, auth checks, error handling, and performance patterns.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# API Development Skill

Guide for creating and modifying API routes in the programming.in.th codebase.

## API Route Structure

All API routes are in `src/app/api/` using Next.js App Router conventions.

### File Naming
- `route.ts` for route handlers
- Dynamic routes: `[param]/route.ts`
- Nested routes: `parent/child/route.ts`

## Required Patterns

### 1. Zod Schema Validation

Always validate input with Zod schemas defined in `src/lib/api/schema/`:

```typescript
import { z } from 'zod'

// Define schema
const RequestSchema = z.object({
  id: z.string().min(1),
  limit: z.coerce.number().optional().default(10),
  filter: z.enum(['all', 'active', 'archived']).optional()
})

// In route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const result = RequestSchema.safeParse(Object.fromEntries(searchParams))

  if (!result.success) {
    return Response.json(
      { error: 'Invalid parameters', details: result.error.flatten() },
      { status: 400 }
    )
  }

  const { id, limit, filter } = result.data
  // ... use validated data
}
```

### 2. Authentication & Authorization

```typescript
import { getServerUser } from '@/lib/session'

export async function POST(request: Request) {
  const user = await getServerUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // For admin-only endpoints
  if (!user.admin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ... handle request
}
```

### 3. Error Handling

Use consistent error responses:

```typescript
// Standard error responses
const badRequest = (message: string) =>
  Response.json({ error: message }, { status: 400 })

const unauthorized = () =>
  Response.json({ error: 'Unauthorized' }, { status: 401 })

const forbidden = () =>
  Response.json({ error: 'Forbidden' }, { status: 403 })

const notFound = (resource: string) =>
  Response.json({ error: `${resource} not found` }, { status: 404 })

const internalError = () =>
  Response.json({ error: 'Internal server error' }, { status: 500 })
```

### 4. Database Queries

```typescript
import { prisma } from '@/lib/prisma'

// Always select only needed fields
const tasks = await prisma.task.findMany({
  where: { private: false },
  select: {
    id: true,
    title: true,
    fullScore: true,
    tags: { select: { id: true, name: true } }
  },
  take: limit,
  skip: offset
})
```

## Performance Guidelines

1. **Select specific fields** - Never use `select: *` equivalent
2. **Paginate results** - Always use `take` and `skip` for lists
3. **Index queries** - Ensure WHERE clauses use indexed columns
4. **Avoid N+1** - Use `include` carefully, prefer batch queries
5. **Cache responses** - Use appropriate Cache-Control headers

## Checklist Before Completing

- [ ] Input validated with Zod schema
- [ ] Auth check if endpoint requires authentication
- [ ] Permission check if endpoint is restricted
- [ ] Only necessary fields selected from database
- [ ] Pagination implemented for list endpoints
- [ ] Consistent error responses
- [ ] TypeScript types for request/response

## Examples in Codebase

Reference these existing API routes:
- `src/app/api/submissions/route.ts` - CRUD with filtering
- `src/app/api/tasks/route.ts` - File upload with S3
- `src/app/api/assessments/route.ts` - Complex relations
