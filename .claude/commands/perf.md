---
description: Analyze a component or page for performance issues
allowed-tools: Read, Glob, Grep, Bash
argument-hint: "<file-path>"
---

# Performance Analysis

Analyze a component, page, or API route for performance issues.

## Instructions

### 1. Read the Target File

Read the file at `$1` (or search for it if partial path given).

### 2. Analyze for Performance Issues

#### React/Next.js Performance
- **Client vs Server**: Is `'use client'` necessary? Could this be a Server Component?
- **Re-renders**: Are there unnecessary state updates? Missing `useMemo`/`useCallback`?
- **Data Fetching**: Is SWR configured correctly? Appropriate revalidation?
- **Bundle Size**: Are imports optimized? Using barrel imports unnecessarily?
- **Images**: Using Next.js `<Image>` component with proper sizing?

#### Database/API Performance
- **Query Efficiency**: Selecting only needed fields? Using proper indexes?
- **N+1 Queries**: Are relations causing multiple queries?
- **Pagination**: Large result sets properly paginated?
- **Caching**: Appropriate use of ISR or SWR caching?

#### General
- **Compression**: Large data properly compressed?
- **Lazy Loading**: Components loaded when needed?
- **Memory Leaks**: Proper cleanup in useEffect?

### 3. Check Related Files

Look at related imports and dependencies that might affect performance.

### 4. Output Format

```markdown
## Performance Analysis: [filename]

### Component Type
Server Component / Client Component / API Route / Utility

### Current Performance Profile
- Render complexity: Low/Medium/High
- Data dependencies: List them
- Bundle impact: Estimated size impact

### Issues Found

#### Critical
1. [Issue description]
   - Location: line X
   - Impact: [explanation]
   - Fix: [specific fix]

#### Warnings
1. [Issue description]
   - Recommendation: [improvement]

### Optimization Opportunities
1. [Specific optimization with code example]

### Recommended Actions
- [ ] Action item 1
- [ ] Action item 2
```
