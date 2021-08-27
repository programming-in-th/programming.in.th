export const AUTH_COOKIE = 'prog-auth'

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://openhouse.triamudom.ac.th'
    : 'http://localhost:3000'
