import { Session as NASession } from 'next-auth'

export interface Session extends NASession {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
    username?: string | null
  }
}
