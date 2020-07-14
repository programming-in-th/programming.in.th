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
  fullScore: number

  type: 'normal' | 'output-only' | 'communication'
  fileName?: ReadonlyArray<string>
}
