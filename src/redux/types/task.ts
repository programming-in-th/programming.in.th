export interface ITaskState {
  readonly currentTask: ITask | null
  readonly taskList: ITask[]
  readonly tags: ReadonlyArray<String>
  readonly status: 'LOADING' | 'SUCCESS'
}

export interface ITask {
  readonly problem_id: string
  readonly author: string
  readonly path: string
  readonly statement_pdf_url: string
  readonly title: string
  readonly difficulty: number
  readonly tags: ReadonlyArray<string>
}
