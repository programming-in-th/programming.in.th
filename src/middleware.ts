import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export default auth(req => {
  // Redirect authenticated users away from login page
  if (req.auth) {
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: ['/login']
}
