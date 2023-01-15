import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string | null
      username?: string | null
      admin?: boolean | null
    } & DefaultSession['user']
  }

  interface User {
    email?: string | null
    id: string
    image?: string | null
    name?: string | null
    username?: string | null
    admin?: boolean | null
  }
}
