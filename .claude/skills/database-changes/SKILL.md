---
name: database-changes
description: Use when modifying Prisma schema or database queries. Ensures proper migrations, type safety, and query performance.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Database Changes Skill

Guide for modifying database schema and queries using Prisma ORM.

## Schema Location

- Schema: `prisma/schema.prisma`
- Migrations: `prisma/migrations/`
- Generated client: `src/prisma/` (git-ignored)

## Schema Modification Process

### 1. Modify Schema

Edit `prisma/schema.prisma`:

```prisma
model NewModel {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Fields
  name      String
  status    Status   @default(PENDING)

  // Relations
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([status])
}

enum Status {
  PENDING
  ACTIVE
  ARCHIVED
}
```

### 2. Generate Migration

```bash
# Create migration
pnpm prisma migrate dev --name descriptive_migration_name

# Generate client (if only generating types)
pnpm prisma generate
```

### 3. Verify Changes

```bash
# Check types compile
pnpm check-types

# Run tests
pnpm test
```

## Query Patterns

### Always Use the Singleton

```typescript
import { prisma } from '@/lib/prisma'

// NOT: import { PrismaClient } from '@prisma/client'
```

### Select Only Needed Fields

```typescript
// Good - explicit selection
const tasks = await prisma.task.findMany({
  select: {
    id: true,
    title: true,
    fullScore: true
  }
})

// Avoid - fetches all fields
const tasks = await prisma.task.findMany()
```

### Pagination

```typescript
// Cursor-based (preferred for large datasets)
const submissions = await prisma.submission.findMany({
  take: 10,
  skip: 1,  // Skip the cursor
  cursor: { id: lastSubmissionId },
  orderBy: { createdAt: 'desc' }
})

// Offset-based (simpler but less performant)
const tasks = await prisma.task.findMany({
  take: limit,
  skip: (page - 1) * limit
})
```

### Relations

```typescript
// Include related data (watch for N+1)
const task = await prisma.task.findUnique({
  where: { id },
  include: {
    tags: true,
    category: true
  }
})

// Nested selection for control
const task = await prisma.task.findUnique({
  where: { id },
  select: {
    id: true,
    title: true,
    tags: {
      select: { id: true, name: true }
    }
  }
})
```

### Transactions

```typescript
// For multiple related operations
const result = await prisma.$transaction(async (tx) => {
  const assessment = await tx.assessment.create({
    data: { name: 'New Assessment', ownerId: userId }
  })

  await tx.taskOnAssessment.createMany({
    data: taskIds.map(taskId => ({
      assessmentId: assessment.id,
      taskId
    }))
  })

  return assessment
})
```

## Performance Guidelines

### 1. Add Indexes for Queries

```prisma
model Submission {
  // ... fields

  @@index([userId, taskId])  // Composite index for common query
  @@index([status])          // Single column for filtering
  @@index([createdAt])       // For ordering
}
```

### 2. Avoid N+1 Queries

```typescript
// Bad - N+1 problem
const tasks = await prisma.task.findMany()
for (const task of tasks) {
  const submissions = await prisma.submission.findMany({
    where: { taskId: task.id }
  })
}

// Good - batch query
const tasks = await prisma.task.findMany({
  include: { submissions: true }
})

// Or use separate optimized query
const taskIds = tasks.map(t => t.id)
const submissions = await prisma.submission.findMany({
  where: { taskId: { in: taskIds } }
})
```

### 3. Use Raw Queries for Complex Operations

```typescript
const result = await prisma.$queryRaw`
  SELECT t.id, t.title, COUNT(s.id) as submission_count
  FROM "Task" t
  LEFT JOIN "Submission" s ON s."taskId" = t.id
  WHERE t.private = false
  GROUP BY t.id
  ORDER BY submission_count DESC
  LIMIT ${limit}
`
```

## Migration Best Practices

1. **Descriptive names**: `add_user_preferences`, `create_notification_table`
2. **Small migrations**: One logical change per migration
3. **Test locally**: Always run migrations on dev database first
4. **Backward compatible**: Consider existing data when changing schema

## Existing Models Reference

| Model | Purpose |
|-------|---------|
| User | NextAuth users |
| Task | Programming problems |
| Submission | User code submissions |
| Assessment | Contests/competitions |
| Category | Hierarchical task organization |
| Tag | Task tags for filtering |
| Bookmark | User bookmarks |

## Checklist Before Completing

- [ ] Schema changes are valid Prisma syntax
- [ ] Migration generated and applied locally
- [ ] Indexes added for new query patterns
- [ ] Queries select only needed fields
- [ ] No N+1 query patterns introduced
- [ ] `pnpm check-types` passes
- [ ] Related API routes updated if needed
