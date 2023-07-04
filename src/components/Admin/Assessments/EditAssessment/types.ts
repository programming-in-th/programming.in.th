import { IAssessmentwithTask } from '@/types/assessments'

export type IAssessment = IAssessmentwithTask & {
  users: { userId: string }[]
  owners: { userId: string }[]
}

export interface IAssessmentForm {
  id: string
  name: string
  description: string
  instruction: string
  open: string
  close: string
  [assign: `assign-${string}`]: boolean
  [assign: `assignOwn-${string}`]: boolean
}
