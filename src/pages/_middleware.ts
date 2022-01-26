import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl

  if (
    !pathname.startsWith('/api') &&
    pathname === '/login' &&
    req.cookies['prog-auth']
  ) {
    return NextResponse.redirect('/')
  }
}
