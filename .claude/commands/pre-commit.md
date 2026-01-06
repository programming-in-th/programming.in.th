---
description: Run pre-commit checks before committing changes
allowed-tools: Bash, Read, Glob, Grep
---

# Pre-Commit Checks

Run all necessary checks before committing changes.

## Instructions

Execute these checks in order:

### 1. Check for Uncommitted Changes
```bash
git status --short
```

### 2. Review Staged Files
```bash
git diff --cached --name-only
```

### 3. Run Format Check
```bash
pnpm format
```

### 4. Run Type Check
```bash
pnpm check-types
```

### 5. Run Linter
```bash
pnpm lint
```

### 6. Run Tests
```bash
pnpm test
```

### 7. Check for Common Issues

Scan staged files for:
- `console.log` statements (should be removed)
- `TODO` or `FIXME` without issue references
- Hardcoded URLs or secrets
- `any` type usage without justification

### 8. Output Summary

```markdown
## Pre-Commit Check Results

### Files to Commit
- List of staged files

### Check Results
| Check | Status |
|-------|--------|
| Format | PASS/FAIL |
| Types | PASS/FAIL |
| Lint | PASS/FAIL |
| Tests | PASS/FAIL |

### Code Quality Scan
- Console statements: X found
- TODOs without refs: X found
- Any types: X found

### Recommendation
**READY TO COMMIT** / **FIX ISSUES FIRST**

If issues found, list specific files and line numbers.
```
