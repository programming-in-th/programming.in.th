---
name: component-development
description: Use when creating or modifying React components. Ensures proper Server/Client component patterns, performance optimization, and accessibility.
allowed-tools: Read, Edit, Write, Glob, Grep
---

Components in `src/components/`. Default to Server Components.

```tsx
// Server Component (default) - no directive needed
export function TaskCard({ task }: { task: Task }) {
  return <div className="p-4 dark:bg-gray-800">{task.title}</div>
}

// Client Component - only for interactivity
'use client'
import { useState } from 'react'
export function Toggle() {
  const [on, setOn] = useState(false)
  return <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
}
```

**When to use `'use client'`**: onClick/onSubmit, useState/useEffect, browser APIs.

**Performance**: Push `'use client'` to smallest component, use `memo()` for expensive renders, Next.js `<Image>`.

**Accessibility**: Labels for inputs, ARIA attributes, keyboard nav for custom elements.

**Styling**: Tailwind only, `dark:` variants, custom colors: `prog-primary-500`.
