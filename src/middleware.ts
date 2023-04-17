import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  if (
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token')
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/login']
}
