# programming.in.th

Next.js 15 + React 19 + TypeScript + Prisma competitive programming platform.

## Quick Reference

- **Package manager**: `pnpm`
- **Verify before commit**: `pnpm check-types && pnpm lint && pnpm test`
- **Prisma**: Import from `@/lib/prisma`, always use `select`
- **Auth**: `getServerUser()` from `@/lib/session`

## Patterns

- [React & Components](.claude/docs/react-patterns.md)
- [API & Validation](.claude/docs/api-patterns.md)
- [Database & Prisma](.claude/docs/database-patterns.md)
- [Authentication](.claude/docs/auth-patterns.md)
