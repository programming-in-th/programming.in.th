# programming.in.th

Next.js 15 + React 19 + TypeScript + Prisma competitive programming platform.

## Core Principles

1. **Performance**: Server Components by default, selective Prisma fields, ISR/SWR caching
2. **No Regression**: Run `pnpm check-types && pnpm lint && pnpm test` before commits
3. **Maintainability**: Follow existing patterns, strict TypeScript, Zod validation

## Key Patterns

```tsx
// Server Component (default) - direct Prisma
const tasks = await prisma.task.findMany({
  where: { private: false },
  select: { id: true, title: true }  // Always select specific fields
})

// Client Component - only when needed
'use client'  // forms, useState, useEffect, browser APIs

// API Routes - always validate with Zod
const result = Schema.safeParse(input)
if (!result.success) return Response.json({ error: 'Invalid' }, { status: 400 })

// Auth - use getServerUser() from @/lib/session
// Prisma - import from @/lib/prisma (singleton)
```

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm check-types  # TypeScript check
pnpm lint         # ESLint
pnpm test         # Vitest
```

## Gotchas

- Prisma: Always `@/lib/prisma`, always use `select`
- Auth: `getServerUser()` for server-side, check `user.admin` for admin routes
- Files: Presigned S3 URLs only, sanitize paths
- Dark mode: `dark:` Tailwind variants
