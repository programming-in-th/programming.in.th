# Auth.js v5 Migration Guide

## Overview

This document describes the migration from NextAuth.js v4 to Auth.js v5 and the breaking changes that affect all users.

## 🚨 Critical Breaking Changes

### 1. All Users Will Be Logged Out

**Impact:** When this update is deployed, **ALL users will be forcibly logged out** and will need to sign in again.

**Reason:** Auth.js v5 uses different session cookie names:

- **Old (v4):** `next-auth.session-token` and `__Secure-next-auth.session-token`
- **New (v5):** `authjs.session-token` and `__Secure-authjs.session-token`

**Mitigation:**

- Users will need to log in again after deployment
- Consider announcing this change in advance
- Plan deployment during low-traffic periods if possible

### 2. New Environment Variables Required

Auth.js v5 requires new environment variables. Update your `.env` file:

```bash
# Required: Generate with: openssl rand -base64 32
AUTH_SECRET=your-generated-secret-here

# Required: Base URL for authentication (replaces NEXTAUTH_URL)
AUTH_URL=http://localhost:3000

# Keep existing OAuth credentials
GITHUB_ID=...
GITHUB_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

**Action Required:**

1. Generate `AUTH_SECRET`: `openssl rand -base64 32`
2. Add it to your production environment variables
3. Update `AUTH_URL` to match your production URL

## Technical Changes

### Package Updates

```json
{
  "next-auth": "4.24.11" → "5.0.0-beta.30",
  "@next-auth/prisma-adapter": "1.0.7" → "@auth/prisma-adapter": "2.11.1"
}
```

**Note:** We are using Auth.js v5 beta version. While this has been tested, be aware that beta versions may have stability considerations.

### API Changes

#### Authentication Configuration

**Before (v4):**

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = { ... }
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

**After (v5):**

```typescript
import NextAuth from 'next-auth'

export const { handlers, auth, signIn, signOut } = NextAuth({ ... })
export const { GET, POST } = handlers
```

#### Session Retrieval

**Before (v4):**

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const session = await getServerSession(authOptions)
```

**After (v5):**

```typescript
import { auth } from '@/lib/auth'

const session = await auth()
```

#### Middleware

**Before (v4):**

```typescript
export default function middleware(req: NextRequest) {
  if (req.cookies.get('next-auth.session-token')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
```

**After (v5):**

```typescript
import { auth } from '@/lib/auth'

export default auth(req => {
  if (req.auth) {
    return NextResponse.redirect(new URL('/', req.url))
  }
})
```

#### Auth Hooks (useRequireAuth, useRequireAdmin)

**Before (v4):**

```typescript
import { useRouter } from 'next/router'

const { data: session } = useSession()
useEffect(() => {
  if (!session && typeof session != 'undefined') {
    router.push('/login')
  }
}, [session, router])
```

**After (v5):**

```typescript
import { useRouter } from 'next/navigation'

const { data: session, status } = useSession()
useEffect(() => {
  if (status === 'loading') return
  if (status === 'unauthenticated') {
    router.push('/login')
  }
}, [status, router])

return status === 'loading' ? null : session
```

**Improvements:**

- Uses `next/navigation` instead of `next/router` (Next.js 15 App Router)
- Checks `status` instead of session value for better loading state handling
- Prevents redirect flashing by waiting for loading to complete
- Returns `null` during loading to prevent flash of wrong content

## Deployment Checklist

Before deploying this update:

- [ ] Generate `AUTH_SECRET` using `openssl rand -base64 32`
- [ ] Add `AUTH_SECRET` to production environment variables
- [ ] Add `AUTH_URL` to production environment variables
- [ ] Verify `GITHUB_ID`, `GITHUB_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` are set
- [ ] Announce to users that they will need to log in again
- [ ] Plan deployment timing (consider low-traffic periods)
- [ ] Test authentication flow in staging environment:
  - [ ] GitHub OAuth login
  - [ ] Google OAuth login
  - [ ] Session persistence across page reloads
  - [ ] Protected routes redirect correctly
  - [ ] Admin-only routes check permissions correctly
- [ ] Verify type checking passes: `pnpm check-types`
- [ ] Verify linting passes: `pnpm lint`
- [ ] Verify tests pass: `pnpm test`

## Testing Authentication

After deployment, verify:

1. **OAuth Login:**
   - Test GitHub login
   - Test Google login
   - Verify user profile data is correctly populated

2. **Session Management:**
   - Verify sessions persist across page reloads
   - Verify logout works correctly
   - Verify session data includes custom fields (`username`, `admin`)

3. **Protected Routes:**
   - Verify unauthenticated users are redirected to `/login`
   - Verify authenticated users can access protected pages
   - Verify admin-only pages check the `admin` flag correctly

4. **No Redirect Flashing:**
   - Verify no flash of content during authentication checks
   - Verify loading states are handled properly

## Rollback Plan

If issues arise after deployment:

1. Revert to the previous commit
2. Redeploy
3. Users will need to log in again (another forced logout)

## Support

If you encounter issues after this migration:

- Check environment variables are correctly set
- Verify `AUTH_SECRET` is at least 32 characters
- Check browser console for auth errors
- Review server logs for authentication failures

## References

- [Auth.js v5 Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Auth.js Documentation](https://authjs.dev/)
- [PR #988: Migrate to Auth.js v5](../pull/988)
