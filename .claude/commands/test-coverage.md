---
description: Analyze test coverage and suggest tests for uncovered code
allowed-tools: Bash, Read, Glob, Grep
argument-hint: "[file-path]"
---

# Test Coverage Analysis

Analyze test coverage and identify areas needing tests.

## Instructions

### 1. Run Coverage Report
```bash
pnpm test:coverage
```

### 2. If File Path Provided

Analyze coverage for specific file `$1`:
- Find the corresponding `.spec.ts` or `.spec.tsx` file
- Identify untested functions and branches
- Suggest specific test cases

### 3. General Coverage Analysis

Review the coverage report and identify:
- Files with < 80% coverage
- Critical paths without tests (API routes, scoring logic)
- Utility functions missing tests

### 4. Priority Assessment

Rank uncovered code by importance:
1. **Critical**: Auth, scoring, submission handling
2. **High**: API routes, data transformations
3. **Medium**: UI components with logic
4. **Low**: Pure presentation components

### 5. Output Format

```markdown
## Test Coverage Analysis

### Overall Coverage
- Statements: X%
- Branches: X%
- Functions: X%
- Lines: X%

### Files Needing Attention

#### Critical (< 50% coverage)
| File | Coverage | Priority |
|------|----------|----------|
| path/to/file.ts | X% | Critical |

#### Low Coverage (50-80%)
| File | Coverage | Priority |
|------|----------|----------|
| path/to/file.ts | X% | High |

### Suggested Test Cases

For [specific file]:
1. Test case: [description]
   ```typescript
   it('should...', () => {
     // test implementation
   })
   ```

### Recommendations
1. Priority files to add tests
2. Types of tests to add (unit, integration)
```
