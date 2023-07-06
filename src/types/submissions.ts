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

export interface IListSubmission {
  user: {
    id: string
    username: string | null
    name: string | null
  } | null
  id: number
  taskId: string
  score: number
  language: string
  time: number
  memory: number
  submittedAt: Date
}

export interface IGeneralSubmission extends IListSubmission {
  groups: IGroup[]
  status: string
  code: string[]
}
