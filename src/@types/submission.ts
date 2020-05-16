import { ITask } from './task'
import { IGroup } from './group'

export interface ISubmission {
  taskID: string
  task: ITask
  uid: string
  language: string
  groups: IGroup[]
  timestamp: Date
  humanTimestamp: string
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
