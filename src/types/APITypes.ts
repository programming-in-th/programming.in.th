import { NextResponse } from 'next/server'

export interface ISubmission {
  id: number
  taskId: string
  score: number
  language: string
  time: number
  memory: number
  submittedAt: string
}

export interface ITaskSubmission {
  id: string
  title: string
  score: number
  fullScore: number
  submissions: ISubmission[]
}

export type APIResponse<T extends keyof APITypes> = NextResponse<
  APITypes[T]['response'] | { error: string }
>

export type APITypes = {
  'GET /api/submissions/assessment': {
    params: never
    response: ITaskSubmission[]
  }
}
