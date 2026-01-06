---
description: Review code changes for quality, performance, and maintainability
allowed-tools: Bash, Read, Glob, Grep
argument-hint: "[file-path or --staged]"
---

# Code Review

Review code changes for quality, performance, and maintainability.

## Instructions

### 1. Identify Changes

If `$ARGUMENTS` is `--staged` or empty, review staged changes:
```bash
git diff --cached --name-only
```

If `$ARGUMENTS` is a file path, review that specific file.

Otherwise, review recent uncommitted changes:
```bash
git diff --name-only
```

### 2. Review Criteria

For each changed file, evaluate:

#### Performance
- [ ] Server Components used where possible (no unnecessary 'use client')
- [ ] Database queries select only needed fields
- [ ] No N+1 query patterns
- [ ] Proper use of caching (SWR, ISR revalidate)
- [ ] Large data sets use pagination

#### No Regression
- [ ] Existing tests still pass (recommend `/verify`)
- [ ] New logic has appropriate test coverage
- [ ] API changes are backward compatible
- [ ] Types are correctly defined (no `any`)

#### Maintainability
- [ ] Code follows existing patterns in codebase
- [ ] Functions are focused and reasonably sized
- [ ] Clear naming conventions
- [ ] Zod schemas for API validation
- [ ] No hardcoded values that should be constants

#### Security
- [ ] User input is validated
- [ ] Auth checks on API endpoints
- [ ] No secrets in code
- [ ] File paths are sanitized

### 3. Output Format

```markdown
## Code Review: [files reviewed]

### Summary
Brief overview of what the changes do.

### Performance
- Issue or approval for each point

### Maintainability
- Issue or approval for each point

### Security
- Issue or approval for each point

### Recommendations
1. Specific actionable improvements
2. ...

### Verdict
**APPROVED** / **CHANGES REQUESTED** / **NEEDS DISCUSSION**
```
