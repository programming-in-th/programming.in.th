---
name: testing
description: Use when writing or modifying tests. Ensures proper test patterns, coverage, and the "No Regression" motto is upheld.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Testing Skill

Guide for writing and maintaining tests in the programming.in.th codebase.

## Testing Stack

- **Unit Tests**: Vitest (jsdom environment)
- **E2E Tests**: Playwright
- **Test Utilities**: @testing-library/react

## Test Locations

```
src/
├── lib/
│   └── scoring/
│       ├── scoring.ts
│       └── scoring.spec.ts    # Co-located unit tests
├── app/
│   └── api/
│       └── user/
│           ├── route.ts
│           └── filterName.spec.ts
tests/
├── index.spec.ts              # E2E tests
└── solution.spec.ts
```

## Unit Test Patterns

### Basic Test Structure

```typescript
// src/lib/example/example.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { myFunction } from './example'

describe('myFunction', () => {
  beforeEach(() => {
    // Reset state before each test
    vi.clearAllMocks()
  })

  it('should return expected result for valid input', () => {
    const result = myFunction('valid-input')
    expect(result).toBe('expected-output')
  })

  it('should throw for invalid input', () => {
    expect(() => myFunction('')).toThrow('Input required')
  })

  it('should handle edge cases', () => {
    expect(myFunction(null)).toBeNull()
    expect(myFunction(undefined)).toBeUndefined()
  })
})
```

### Testing Async Code

```typescript
import { describe, it, expect, vi } from 'vitest'

describe('asyncFunction', () => {
  it('should resolve with data', async () => {
    const result = await asyncFunction('input')
    expect(result).toEqual({ data: 'expected' })
  })

  it('should reject on error', async () => {
    await expect(asyncFunction('bad-input')).rejects.toThrow('Error message')
  })
})
```

### Mocking

```typescript
import { describe, it, expect, vi } from 'vitest'

// Mock a module
vi.mock('@/lib/prisma', () => ({
  prisma: {
    task: {
      findMany: vi.fn().mockResolvedValue([{ id: '1', title: 'Test' }])
    }
  }
}))

// Mock a function
const mockFn = vi.fn()
mockFn.mockReturnValue('mocked result')
mockFn.mockResolvedValue('async mocked result')
```

### Testing React Components

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const onSubmit = vi.fn()
    render(<MyComponent onSubmit={onSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
```

## E2E Test Patterns

### Basic Playwright Test

```typescript
// tests/feature.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Feature', () => {
  test('should navigate to page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/programming.in.th/)
  })

  test('should perform user action', async ({ page }) => {
    await page.goto('/tasks')

    // Find and click element
    await page.click('text=First Task')

    // Wait for navigation
    await page.waitForURL(/\/tasks\//)

    // Assert content
    await expect(page.locator('h1')).toContainText('First Task')
  })
})
```

### Testing with Authentication

```typescript
import { test, expect } from '@playwright/test'

test.describe('Authenticated Features', () => {
  test.beforeEach(async ({ page }) => {
    // Set up auth state
    await page.goto('/login')
    // ... perform login
  })

  test('should access protected page', async ({ page }) => {
    await page.goto('/submissions')
    await expect(page.locator('h1')).toContainText('My Submissions')
  })
})
```

## Test Coverage

### Running Coverage

```bash
# Generate coverage report
pnpm test:coverage

# Coverage reports output to:
# - coverage/text (console)
# - coverage/html (browser)
# - coverage/json-summary
```

### Coverage Requirements

Priority areas for test coverage:
1. **Critical**: Scoring algorithms (`src/lib/scoring/`)
2. **High**: API schema validation (`src/lib/api/schema/`)
3. **High**: Auth utilities (`src/lib/auth.ts`, `src/lib/session.ts`)
4. **Medium**: Data transformations and utilities
5. **Low**: UI components (covered by E2E)

## Writing Tests for New Code

### 1. Identify What to Test

- Pure functions: Input → Output
- Side effects: Verify calls made
- Error handling: Edge cases and failures
- Integration: Component interactions

### 2. Follow AAA Pattern

```typescript
it('should calculate total correctly', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }]

  // Act
  const result = calculateTotal(items)

  // Assert
  expect(result).toBe(30)
})
```

### 3. Test Edge Cases

```typescript
describe('parseScore', () => {
  it('handles zero', () => expect(parseScore(0)).toBe(0))
  it('handles negative', () => expect(parseScore(-1)).toBe(0))
  it('handles max value', () => expect(parseScore(100)).toBe(100))
  it('handles overflow', () => expect(parseScore(101)).toBe(100))
  it('handles null', () => expect(parseScore(null)).toBe(0))
  it('handles undefined', () => expect(parseScore(undefined)).toBe(0))
})
```

## Commands

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run specific test file
pnpm test -- src/lib/scoring/scoring.spec.ts

# Run with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run specific E2E test
pnpm test:e2e -- tests/solution.spec.ts
```

## No Regression Checklist

Before completing any code change:

- [ ] All existing tests pass (`pnpm test`)
- [ ] New functionality has tests
- [ ] Edge cases are covered
- [ ] Coverage maintained or improved
- [ ] E2E tests pass for user-facing changes

## Examples in Codebase

Reference existing tests:
- `src/lib/scoring/scoring.spec.ts` - Algorithm testing
- `src/lib/api/schema/searchParams.spec.ts` - Schema validation
- `tests/solution.spec.ts` - E2E flow testing
