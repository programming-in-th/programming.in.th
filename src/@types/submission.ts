export interface ISubmission {
  uid: string
  submission_id: string
  username: string
  problem_id: string
  problem_name: string
  language: string
  status: string
  points: number
  time: number
  memory: number
  timestamp: Date
  humanTimestamp: string
  code?: string
  hideCode: boolean
}
