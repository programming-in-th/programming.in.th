# Database & Prisma Patterns

## Setup

- **Schema**: `prisma/schema.prisma`
- **Import**: Always `import { prisma } from '@/lib/prisma'`

## Schema Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
pnpm prisma migrate dev --name descriptive_name
# 3. Verify types
pnpm check-types
```

## Query Patterns

### Always Select Specific Fields

```typescript
// Good
const tasks = await prisma.task.findMany({
  where: { private: false },
  select: { id: true, title: true, fullScore: true }
})

// Bad - fetches all columns
const tasks = await prisma.task.findMany({
  where: { private: false }
})
```

### Always Paginate

```typescript
const tasks = await prisma.task.findMany({
  where: { private: false },
  select: { id: true, title: true },
  take: 10,
  skip: page * 10
})
```

### Avoid N+1 Queries

```typescript
// Option 1: Include related data
const tasks = await prisma.task.findMany({
  select: { id: true, title: true, tags: true }
})

// Option 2: Batch query
const taskIds = tasks.map(t => t.id)
const submissions = await prisma.submission.findMany({
  where: { taskId: { in: taskIds } }
})
```

## Indexes

Add `@@index([field])` for columns used in:
- `WHERE` clauses
- `ORDER BY` clauses
- Foreign key lookups

## Models Reference

User, Task, Submission, Assessment, Category, Tag, Bookmark
