# High-Impact Modernization Proposal for programming.in.th

This document outlines prioritized, high-impact changes to modernize the codebase and improve maintainability.

---

## Priority 1: Critical Upgrades (High Impact, Security/Stability)

### 1.1 Migrate from NextAuth.js v4 to Auth.js v5

**Current State:**
- Using `next-auth@4.24.11` with `@next-auth/prisma-adapter@1.0.7`
- Legacy API patterns not optimized for App Router

**Why Migrate:**
- Auth.js v5 is the actively maintained successor
- Native App Router support with Edge Runtime compatibility
- Simplified configuration with better TypeScript inference
- Built-in CSRF protection improvements
- The v4 branch receives only security patches

**Migration Steps:**
```bash
pnpm remove next-auth @next-auth/prisma-adapter
pnpm add next-auth@5 @auth/prisma-adapter
```

**Key Changes:**
```typescript
// Before: src/lib/auth.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = { ... }

// After: src/lib/auth.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  // ...
})
```

**Estimated Effort:** 2-3 days

---

### 1.2 Migrate ESLint to Flat Config (ESLint 9)

**Current State:**
- ESLint 8.57.0 with legacy `.eslintrc.js` configuration
- Multiple plugins with legacy configuration patterns

**Why Migrate:**
- ESLint 8.x is in maintenance mode (EOL soon)
- Flat config is simpler, more explicit, and faster
- Better TypeScript integration with `typescript-eslint` v8

**Migration:**
```bash
pnpm remove eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import eslint-plugin-react
pnpm add -D eslint@9 typescript-eslint @eslint/js eslint-plugin-react-hooks
```

**New `eslint.config.js`:**
```javascript
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { '@next/next': next },
    rules: { ...next.configs.recommended.rules }
  }
)
```

**Estimated Effort:** 1 day

---

### 1.3 Remove Duplicate/Dead Dependencies

**Current Issues:**
| Package | Issue |
|---------|-------|
| `react-table@7.8.0` | Deprecated, replaced by `@tanstack/react-table` (already installed) |
| `prism-react-renderer@1.3.5` | Outdated (v2.x available), may conflict with `prismjs` |
| `@supabase/realtime-js@2.15.6` | Appears unused (custom SSE implementation exists) |

**Action:**
```bash
pnpm remove react-table @types/react-table @supabase/realtime-js
pnpm add prism-react-renderer@latest
```

**Estimated Effort:** 0.5 days

---

## Priority 2: Modern Tooling Upgrades (Medium-High Impact)

### 2.1 Upgrade to Tailwind CSS v4

**Current State:** Tailwind CSS 3.4.5

**Why Upgrade:**
- Significant performance improvements (up to 10x faster)
- Native CSS cascade layers
- Zero-config content detection
- Simplified configuration with CSS-first approach
- Smaller bundle size

**Migration:**
```bash
pnpm remove tailwindcss postcss autoprefixer @tailwindcss/typography
pnpm add tailwindcss@4 @tailwindcss/postcss @tailwindcss/typography
```

**New CSS-based config (`src/styles/globals.css`):**
```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
  --color-prog-primary-500: #3584FB;
  --color-prog-primary-600: #3171D9;
  --font-display: 'Inter var', 'Noto Sans Thai', sans-serif;
}
```

**Estimated Effort:** 1-2 days

---

### 2.2 Update TypeScript Configuration

**Current Issues:**
- `moduleResolution: "node"` is legacy
- `target: "es6"` is conservative for Node 24

**Updated `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2023"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": { "@/*": ["./src/*"] },
    "plugins": [{ "name": "next" }]
  }
}
```

**Key Improvements:**
- `moduleResolution: "bundler"` - Modern resolution for Next.js
- `verbatimModuleSyntax` - Stricter import/export handling
- `noUncheckedIndexedAccess` - Safer array/object access
- `ES2022` target - Matches Node 24 capabilities

**Estimated Effort:** 0.5 days (with type fixes)

---

## Priority 3: Architecture Improvements (High Impact, More Effort)

### 3.1 Implement Type-Safe API Layer with tRPC or Hono

**Current State:**
- Manual Zod validation in each API route
- No type sharing between client and server
- Repetitive authorization checks

**Option A: tRPC (Recommended for this codebase)**
```typescript
// src/server/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server'
import { getServerUser } from '@/lib/session'

const t = initTRPC.context<{ user: User | null }>().create()

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({ ctx: { user: ctx.user } })
})

// src/server/routers/submissions.ts
export const submissionsRouter = t.router({
  list: publicProcedure
    .input(SubmissionSchema)
    .query(async ({ input }) => { /* ... */ }),

  create: protectedProcedure
    .input(SubmitSchema)
    .mutation(async ({ input, ctx }) => { /* ... */ })
})
```

**Benefits:**
- End-to-end type safety (no `fetch` calls, full inference)
- Automatic input validation
- Centralized middleware for auth/logging
- Batch requests automatically

**Option B: Hono (Lighter weight)**
```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()
  .get('/submissions', zValidator('query', SubmissionSchema), async (c) => {
    // Fully typed
  })

export type AppType = typeof app
```

**Estimated Effort:** 3-5 days

---

### 3.2 Add API Rate Limiting

**Current State:** No rate limiting on API routes

**Implementation with Upstash:**
```bash
pnpm add @upstash/ratelimit @upstash/redis
```

```typescript
// src/lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true
})

// Usage in API route or middleware
const { success, limit, remaining } = await ratelimit.limit(userId)
if (!success) return new Response('Rate limited', { status: 429 })
```

**Alternative (No external service):** Use Next.js middleware with in-memory store for simpler deployments.

**Estimated Effort:** 1 day

---

### 3.3 Centralize Authorization Logic

**Current State:** Authorization scattered across API routes

**Proposed Pattern:**
```typescript
// src/lib/api/middleware/authorize.ts
import { getServerUser } from '@/lib/session'

type Permission = 'task:read' | 'task:write' | 'submission:create' | 'admin'

export async function authorize(
  required: Permission[],
  context: { taskId?: string; assessmentId?: string }
) {
  const user = await getServerUser()

  // Check permissions based on context
  const can = await checkPermissions(user, required, context)

  if (!can.authorized) {
    throw new AuthorizationError(can.reason)
  }

  return { user, ...can.context }
}

// Usage
export async function POST(req: NextRequest) {
  const { user } = await authorize(['submission:create'], { taskId })
  // User is guaranteed to exist and have permission
}
```

**Estimated Effort:** 2 days

---

## Priority 4: Developer Experience (Medium Impact)

### 4.1 Add Biome for Faster Linting/Formatting

**Why:**
- 10-100x faster than ESLint + Prettier
- Single tool for linting and formatting
- Growing ecosystem, production-ready

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

Can coexist with ESLint initially, then migrate fully.

**Estimated Effort:** 0.5 days

---

### 4.2 Improve Test Coverage

**Current State:** Minimal test coverage

**Recommended Additions:**
1. **API Route Tests** - Test authorization logic
2. **Integration Tests** - Database operations with test containers
3. **Component Tests** - Key UI components

```typescript
// Example: API test with vitest
import { testApiHandler } from 'next-test-api-route-handler'
import * as appHandler from '@/app/api/submissions/route'

describe('POST /api/submissions', () => {
  it('requires authentication', async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'POST' })
        expect(res.status).toBe(401)
      }
    })
  })
})
```

**Estimated Effort:** 3-5 days (ongoing)

---

### 4.3 Add OpenTelemetry for Observability

```bash
pnpm add @opentelemetry/api @opentelemetry/sdk-node @vercel/otel
```

```typescript
// instrumentation.ts
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({ serviceName: 'programming-in-th' })
}
```

**Benefits:**
- Trace slow API calls and database queries
- Identify performance bottlenecks
- Integrates with Vercel Analytics or self-hosted Jaeger/Grafana

**Estimated Effort:** 1 day

---

## Priority 5: Future Considerations (Lower Priority)

### 5.1 Consider Server Actions for Forms

Replace some API routes with Server Actions for simpler forms:
```typescript
// Before: Client component + API call
const onSubmit = async (data) => {
  await fetch('/api/bookmarks', { method: 'POST', body: JSON.stringify(data) })
}

// After: Server Action
async function addBookmark(taskId: string) {
  'use server'
  const user = await getServerUser()
  await prisma.bookmark.create({ data: { userId: user.id, taskId } })
  revalidatePath('/tasks')
}
```

### 5.2 Evaluate React Server Components Patterns

- Move more data fetching to Server Components
- Use Suspense boundaries for loading states
- Reduce client-side JavaScript bundle

### 5.3 Database Connection Pooling

For high traffic, consider:
- PgBouncer for connection pooling
- Prisma Accelerate for edge deployments

---

## Implementation Roadmap

| Phase | Changes | Effort |
|-------|---------|--------|
| **Phase 1** | Auth.js v5, Remove dead deps, TSConfig | 3-4 days |
| **Phase 2** | ESLint 9, Tailwind v4 | 2-3 days |
| **Phase 3** | Rate limiting, Centralized auth | 3 days |
| **Phase 4** | tRPC migration (gradual) | 5-7 days |
| **Phase 5** | Testing, Observability | Ongoing |

---

## Summary of High-Impact Changes

| Change | Impact | Effort | Risk |
|--------|--------|--------|------|
| Auth.js v5 | High (security, DX) | Medium | Low |
| Remove dead deps | Medium (bundle size) | Low | Very Low |
| Tailwind v4 | Medium (performance, DX) | Medium | Low |
| ESLint 9 | Medium (DX, future-proof) | Low | Very Low |
| TSConfig modernization | Medium (type safety) | Low | Low |
| tRPC | High (type safety, DX) | High | Medium |
| Rate limiting | High (security) | Low | Very Low |
| Centralized auth | High (maintainability) | Medium | Low |

**Recommended Starting Point:** Phase 1 changes provide the highest ROI with lowest risk.
