---
description: Run all verification checks (types, lint, tests) - the "No Regression" check
allowed-tools: Bash, Read, Glob, Grep
---

Run in sequence, stop on failure:
1. `pnpm check-types`
2. `pnpm lint`
3. `pnpm test`

Report **PASS/FAIL** with error details if any.
