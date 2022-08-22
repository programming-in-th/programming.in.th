import { User } from '@prisma/client'

export interface ITestCase {
  memory_usage: number
  message: string
  score: number
  status: string
  submission_id: string
  test_index: number
  time_usage: number
}

export interface IGroup {
  full_score: number
  group_index: number
  score: number
  run_result: ITestCase[]
  submission_id: string
}

export interface IGeneralSubmission {
  id: number
  user: User
  score: number
  language: string
  time: number
  memory: number
  submittedAt: Date
  groups: IGroup[]
  status: string
  code: string[]
}
