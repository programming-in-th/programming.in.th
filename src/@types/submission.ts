import { ITask } from './task'
import { IGroup } from './group'

export interface ISubmission {
  ID: string

  problem: ITask
  uid: string
  language: string
  groups: IGroup[]
  points: number
  timestamp: Date
  humanTimestamp: string
}

export interface ISubmissionList {
  submissionID: string
  username: string
  timestamp: Date
  humanTimestamp: string
  language: string
  points: number
  taskTitle: string
  time: number
  memory: number
}
