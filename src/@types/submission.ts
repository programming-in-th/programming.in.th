import { ITask } from './task'
import { IGroup } from './group'

export interface ISubmission {
  taskID: string
  score: number
  fullScore: number
  time: number
  memory: number
  language: string
  groups: IGroup[]
  codelen: number
  timestamp: any
  uid: string
  status: string

  task: ITask
  username: string
  code: string
}

export interface ISubmissionList {
  submissionID: string
  username: string
  timestamp: Date
  humanTimestamp: string
  language: string
  score: number
  fullScore: number
  taskID: string
  time: number
  memory: number
}
