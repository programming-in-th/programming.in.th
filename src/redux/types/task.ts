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

export interface ISubmission {
  readonly uid: string,
  readonly submission_id: string,

  readonly username: string,
  readonly problem_id: string,
  readonly language: string,
  readonly status: string,
  readonly points: number,
  readonly time: number,
  readonly memory: number,
  readonly timestamp: Date,
}