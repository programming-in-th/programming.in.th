export interface ITask {
  id: string
  path: string
  title: string
  timeLimit: number
  memoryLimit: number
  tags: ReadonlyArray<string>
  visible: boolean
  submit: boolean
  solved: number
}
