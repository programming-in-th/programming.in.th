# programming.in.th

Next.js 15 + React 19 + TypeScript + Prisma competitive programming platform.

## Quick Reference

- **Package manager**: `pnpm`
- **Verify before commit**: `pnpm check-types && pnpm lint && pnpm test`
- **Prisma**: Import from `@/lib/prisma`, always use `select`
- **Auth**: `getServerUser()` from `@/lib/session`

## Patterns

- [React & Components](.agents/docs/react-patterns.md)
- [API & Validation](.agents/docs/api-patterns.md)
- [Database & Prisma](.agents/docs/database-patterns.md)
- [Authentication](.agents/docs/auth-patterns.md)

## Agent Config

Shared across harnesses; `CLAUDE.md` imports this file.

- **Skills**: `.agents/skills/` (`.claude/skills` is a symlink to it)
  - Task guides: `api-development`, `component-development`, `database-changes`
  - Workflows: `verify`, `review`, `perf`
- **Claude Code only**: subagents in `.claude/agents/`, permissions and hooks
  in `.claude/settings.json`

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
