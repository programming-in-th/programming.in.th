---
name: database-changes
description: Use when modifying Prisma schema or database queries. Ensures proper migrations, type safety, and query performance.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

Schema at `prisma/schema.prisma`. Always import from `@/lib/prisma`.

**Schema changes**:
```bash
# Edit schema, then:
pnpm prisma migrate dev --name descriptive_name
pnpm check-types
```

**Query patterns**:
```typescript
// Always select specific fields
const tasks = await prisma.task.findMany({
  where: { private: false },
  select: { id: true, title: true },
  take: 10, skip: 0  // Always paginate
})

// Avoid N+1 - use include or batch queries
const tasks = await prisma.task.findMany({ include: { tags: true } })
// OR
const submissions = await prisma.submission.findMany({
  where: { taskId: { in: taskIds } }
})
```

**Indexes**: Add `@@index([field])` for WHERE/ORDER BY columns.

**Models**: User, Task, Submission, Assessment, Category, Tag, Bookmark.
