import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname === '/login' &&
    (req.cookies.get('next-auth.session-token') ||
      req.cookies.get('__Secure-next-auth.session-token')) &&
    !pathname.startsWith('/api')
  ) {
    req.nextUrl.pathname = '/'
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: ['/login']
}
