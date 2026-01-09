---
description: Review code changes for quality, performance, and maintainability
allowed-tools: Bash, Read, Glob, Grep
argument-hint: "[file-path or --staged]"
---

1. Get changes: `git diff` (or `git diff --cached` for staged, or read specific file)
2. Review for:
   - **Performance**: Server Components, selective queries, no N+1, caching
   - **Types**: No `any`, proper Zod validation
   - **Security**: Auth checks, input validation, no secrets
   - **Patterns**: Follows codebase conventions
3. Report issues and verdict: **APPROVED** / **CHANGES REQUESTED**
