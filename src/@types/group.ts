import { IStatus } from './status'

export interface IGroup {
  status: IStatus[]
  score: number
  fullScore: number
}
