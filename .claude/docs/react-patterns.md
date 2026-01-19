# React & Component Patterns

## Server vs Client Components

**Default to Server Components** - no directive needed.

```tsx
// Server Component (default)
export function TaskCard({ task }: { task: Task }) {
  return <div className="p-4 dark:bg-gray-800">{task.title}</div>
}
```

**Use `'use client'` only when required**:
- Event handlers (`onClick`, `onSubmit`)
- React hooks (`useState`, `useEffect`)
- Browser APIs (`localStorage`, `window`)

```tsx
'use client'
import { useState } from 'react'

export function Toggle() {
  const [on, setOn] = useState(false)
  return <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
}
```

## Performance

- Push `'use client'` to the smallest possible component
- Use `memo()` for expensive renders
- Use Next.js `<Image>` for images

## Styling

- **Tailwind only** - no CSS files
- **Dark mode**: Use `dark:` variants (e.g., `dark:bg-gray-800`)
- **Custom colors**: `prog-primary-500`

## Accessibility

- Labels for all form inputs
- ARIA attributes where semantic HTML isn't sufficient
- Keyboard navigation for custom interactive elements
