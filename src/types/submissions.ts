import { User } from '@prisma/client'

export interface IGeneralSubmission {
  id: number
  user: User
  score: number
  language: String
  time: number
  memory: number
  submittedAt: Date
}
