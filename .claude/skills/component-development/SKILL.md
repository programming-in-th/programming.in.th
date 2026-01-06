---
name: component-development
description: Use when creating or modifying React components. Ensures proper Server/Client component patterns, performance optimization, and accessibility.
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Component Development Skill

Guide for creating React components in the programming.in.th codebase.

## Component Location

All components are in `src/components/`, organized by feature:
- `src/components/common/` - Shared UI components
- `src/components/tasks/` - Task-related components
- `src/components/submissions/` - Submission components
- Feature-specific directories as needed

## Server vs Client Components

### Default: Server Components

Most components should be Server Components (no directive needed):

```tsx
// src/components/TaskCard.tsx
// No 'use client' = Server Component
import { Task } from '@/types/task'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-gray-500">Score: {task.fullScore}</p>
    </div>
  )
}
```

### When to Use Client Components

Add `'use client'` only when you need:
- Event handlers (onClick, onSubmit, etc.)
- useState, useEffect, useRef
- Browser APIs (localStorage, window)
- Third-party libraries requiring client-side

```tsx
'use client'

import { useState } from 'react'

export function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  )
}
```

## Styling with Tailwind CSS

Use Tailwind CSS classes consistently:

```tsx
// Good - Using Tailwind utilities
<div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
  <span className="text-prog-primary-500">Title</span>
</div>

// Custom colors available:
// prog-primary-500, prog-primary-600
// prog-gray-100, prog-gray-500
// prog-white-100, prog-white-500
```

## Data Fetching Patterns

### Server Component (Preferred)
```tsx
// Fetch data directly in Server Component
import { prisma } from '@/lib/prisma'

export async function TaskList() {
  const tasks = await prisma.task.findMany({
    where: { private: false },
    select: { id: true, title: true }
  })

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  )
}
```

### Client Component with SWR
```tsx
'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export function DynamicTaskList() {
  const { data, error, isLoading } = useSWR<Task[]>('/api/tasks', fetcher)

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <ul>
      {data?.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  )
}
```

## Performance Optimization

### 1. Minimize Client Components
Push `'use client'` down to the smallest component that needs it:

```tsx
// Good - Only button is client
export function TaskCard({ task }: TaskCardProps) {
  return (
    <div>
      <h3>{task.title}</h3>
      <BookmarkButton taskId={task.id} /> {/* This is 'use client' */}
    </div>
  )
}
```

### 2. Use React.memo for Expensive Renders
```tsx
'use client'

import { memo } from 'react'

export const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />)
})
```

### 3. Optimize Images
```tsx
import Image from 'next/image'

export function UserAvatar({ src, name }: { src: string; name: string }) {
  return (
    <Image
      src={src}
      alt={name}
      width={40}
      height={40}
      className="rounded-full"
    />
  )
}
```

## Accessibility Requirements

1. **Labels for inputs**
```tsx
<label htmlFor="email" className="sr-only">Email</label>
<input id="email" type="email" aria-label="Email address" />
```

2. **Keyboard navigation**
```tsx
{/* Native buttons handle Enter/Space automatically - just use onClick */}
<button onClick={handleClick}>Submit</button>

{/* For custom interactive elements, handle both Enter and Space */}
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
>
  Custom Button
</div>
```

3. **ARIA attributes**
```tsx
<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

## Component Checklist

- [ ] Server Component unless interactivity required
- [ ] TypeScript props interface defined
- [ ] Tailwind CSS for styling (no inline styles)
- [ ] Proper loading and error states
- [ ] Accessible (labels, ARIA, keyboard nav)
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support (`dark:` variants)

## Examples in Codebase

Reference these existing components:
- `src/components/Code.tsx` - CodeMirror integration
- `src/components/Tasks/TaskItem.tsx` - Basic task card component
- `src/components/Submission/SubmissionModal.tsx` - Modal with submission details
- `src/components/RootLayout/Navbar/Navbar.tsx` - Navigation with auth state
