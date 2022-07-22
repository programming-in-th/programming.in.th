import { Session as NASession } from 'next-auth'

export type Task = {
  id: string
  title: string
  tags: string[]
  solved: number
  score: number
  fullScore: number
  showTags: string[] | boolean
}

export interface Session extends NASession {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
    username?: string | null
  }
}
