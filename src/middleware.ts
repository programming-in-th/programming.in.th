import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const url = req.nextUrl.clone()
  url.pathname = '/'
  if (
    pathname === '/login' &&
    (req.cookies['next-auth.session-token'] ||
      req.cookies['__Secure-next-auth.session-token']) &&
    !pathname.startsWith('/api')
  ) {
    return NextResponse.redirect(url)
  }
}
