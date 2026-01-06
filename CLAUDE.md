# programming.in.th - Claude Code Guidelines

A competitive programming practice platform built with Next.js 15, React 19, TypeScript, and Prisma.

## Architecture Overview

```
src/
├── app/           # Next.js 15 App Router (pages + API routes)
├── components/    # React components (65 files, ~5500 LOC)
├── lib/           # Business logic, hooks, utilities
│   ├── api/       # API schemas (Zod) & query functions
│   ├── server/    # Server-only utilities
│   └── scoring/   # Scoring algorithms with tests
├── utils/         # Helper utilities
├── types/         # TypeScript interfaces
└── styles/        # Global CSS/SCSS
prisma/
├── schema.prisma  # Database schema (PostgreSQL)
└── migrations/    # Database migrations
```

## Core Principles

### 1. Performance First
- Use Server Components by default; only add `'use client'` when necessary
- Leverage ISR with appropriate `revalidate` values (tasks page: 3600s)
- Use SWR for client-side data fetching with proper caching
- Compress code submissions with Brotli
- Optimize database queries - use selective fields, avoid N+1

### 2. No Regression Motto
- **ALWAYS** run `pnpm check-types` before completing any TypeScript changes
- **ALWAYS** run `pnpm test` after modifying logic or utilities
- **ALWAYS** run `pnpm lint` before committing
- Never merge code that fails existing tests
- Add tests for new scoring algorithms and API schema changes

### 3. Maintainability & Readability
- Follow existing patterns in the codebase
- Keep components focused and small
- Use TypeScript strict mode - no `any` types without justification
- Validate all API inputs with Zod schemas

## Tech Stack Quick Reference

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS, Headless UI |
| Forms | React Hook Form + Zod |
| Data Fetching | SWR (client), Prisma (server) |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth (GitHub, Google OAuth) |
| Storage | AWS S3 / DigitalOcean Spaces |
| Testing | Vitest (unit), Playwright (e2e) |
| Code Editor | CodeMirror |

## Development Commands

```bash
pnpm dev              # Start dev server (Turbopack)
pnpm build            # Production build
pnpm check-types      # TypeScript type checking (run before commits!)
pnpm lint             # ESLint
pnpm format           # Prettier + ESLint --fix
pnpm test             # Unit tests (Vitest)
pnpm test:coverage    # Tests with coverage report
pnpm test:e2e         # E2E tests (Playwright)
```

## Code Patterns

### Server Components (Default)
```tsx
// src/app/tasks/page.tsx - No 'use client' = Server Component
export default async function TasksPage() {
  const tasks = await prisma.task.findMany({ where: { private: false } })
  return <TaskList tasks={tasks} />
}
```

### Client Components (When Needed)
```tsx
'use client'
// Only for: forms, event handlers, browser APIs, hooks like useState/useEffect
import { useState } from 'react'
export function InteractiveComponent() {
  const [state, setState] = useState(false)
  // ...
}
```

### API Routes with Zod Validation
```tsx
// src/app/api/example/route.ts
import { z } from 'zod'

const Schema = z.object({
  id: z.string(),
  limit: z.coerce.number().optional().default(10)
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const result = Schema.safeParse(Object.fromEntries(searchParams))

  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 })
  }
  // Use result.data...
}
```

### SWR Data Fetching
```tsx
'use client'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export function DataComponent({ id }: { id: string }) {
  const { data, error, isLoading } = useSWR(`/api/items/${id}`, fetcher)

  if (isLoading) return <Loading />
  if (error) return <Error />
  return <Display data={data} />
}
```

### Prisma Queries
```tsx
// Use singleton pattern - import from lib/prisma
import { prisma } from '@/lib/prisma'

// Select only needed fields
const tasks = await prisma.task.findMany({
  where: { private: false },
  select: { id: true, title: true, fullScore: true }
})

// Use includes sparingly, prefer separate queries for complex relations
```

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `TaskCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatScore.ts`)
- API routes: `route.ts` inside appropriate directory
- Tests: `*.spec.ts` or `*.spec.tsx`
- Types: `camelCase.ts` in `src/types/`

## Database Schema (Key Models)

- **User**: Auth users with OAuth accounts
- **Task**: Programming problems with statements (PDF/Markdown)
- **Submission**: User code submissions (Brotli compressed)
- **Assessment**: Contests with tasks and participants
- **Category/Tag**: Task organization

## Common Gotchas

1. **Prisma Client**: Always import from `@/lib/prisma` (singleton pattern)
2. **Auth Checks**: Use `getServerUser()` from `@/lib/session` for server-side auth
3. **File Uploads**: Use presigned S3 URLs via API, never direct uploads
4. **Code Compression**: Submissions use Brotli - handle Buffer types correctly
5. **Dark Mode**: Uses class strategy with `data-theme` attribute

## Performance Checklist

- [ ] Using Server Components where possible
- [ ] API responses include only necessary fields
- [ ] Images use Next.js `<Image>` component
- [ ] Large lists use pagination or infinite scroll
- [ ] No unnecessary re-renders (check `useMemo`/`useCallback` usage)
- [ ] Database queries are indexed appropriately

## Pre-Commit Checklist

Before committing any changes:

1. `pnpm check-types` - Must pass with no errors
2. `pnpm lint` - Must pass (warnings are OK if justified)
3. `pnpm test` - All tests must pass
4. Review diff for:
   - No console.log statements
   - No hardcoded secrets
   - No TODO comments without issue references

## Security Guidelines

- Never commit `.env` files or secrets
- Always validate user input with Zod
- Check authorization on every API endpoint
- Use parameterized queries (Prisma handles this)
- Sanitize file paths for S3 operations
