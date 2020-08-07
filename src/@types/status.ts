export interface IStatus {
  index?: number
  time: number // ms
  memory: number // kB
  message: string
  verdict: string
}
