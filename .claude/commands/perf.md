---
description: Analyze a component or page for performance issues
allowed-tools: Read, Glob, Grep, Bash
argument-hint: "<file-path>"
---

Analyze `$1` for:
- **React**: Unnecessary `'use client'`? Missing memoization? Re-render issues?
- **Data**: Selective fields? N+1 queries? Pagination? Caching (ISR/SWR)?
- **Bundle**: Optimized imports? Next.js `<Image>`?

Report issues by severity (Critical/Warning) with specific fixes.
