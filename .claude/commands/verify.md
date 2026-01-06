---
description: Run all verification checks (types, lint, tests) - the "No Regression" check
allowed-tools: Bash, Read, Glob, Grep
---

# Verify - No Regression Check

Run all verification checks to ensure no regressions have been introduced.

## Instructions

Execute the following checks in sequence, stopping if any fails:

1. **TypeScript Type Check**
   ```bash
   pnpm check-types
   ```
   - Must complete with exit code 0
   - Report any type errors found

2. **ESLint**
   ```bash
   pnpm lint
   ```
   - Must complete with exit code 0
   - Warnings are acceptable, errors are not

3. **Unit Tests**
   ```bash
   pnpm test
   ```
   - All tests must pass
   - Report test count and any failures

## Output Format

Provide a summary in this format:

```
## Verification Results

| Check | Status | Details |
|-------|--------|---------|
| TypeScript | PASS/FAIL | X errors found |
| ESLint | PASS/FAIL | X errors, Y warnings |
| Unit Tests | PASS/FAIL | X passed, Y failed |

**Overall: PASS/FAIL**
```

If any check fails, provide specific details about the failures and suggest fixes.
