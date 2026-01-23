# Authentication Patterns

## Server-Side Auth

```typescript
import { getServerUser } from '@/lib/session'

// In Server Components or API routes
const user = await getServerUser()

if (!user) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## Admin Routes

```typescript
const user = await getServerUser()

if (!user) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

if (!user.admin) {
  return Response.json({ error: 'Forbidden' }, { status: 403 })
}
```

## Elysia Auth Guard

```typescript
import { Elysia } from 'elysia'

const app = new Elysia()
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

## Checklist

- [ ] `getServerUser()` on all protected routes
- [ ] Check `user.admin` for admin-only routes
- [ ] Return 401 for unauthenticated, 403 for unauthorized
- [ ] Never expose user data without ownership check
