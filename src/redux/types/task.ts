export interface ITaskState {
  readonly taskPage: ITaskPage
  readonly currentTask: ITask | null
  readonly taskList: ReadonlyArray<ITask>
  readonly status: 'LOADING' | 'SUCCESS' | null
}

export interface ITask {
  readonly problem_id: string
  readonly author: string
  readonly path: string
  readonly url: string
  readonly title: string
  readonly time_limit: number
  readonly memory_limit: number
  readonly difficulty: number
  readonly tags: ReadonlyArray<string>
}

export interface ITaskPage {
  readonly currentPage: number
  readonly currentPageSize: number | undefined
  readonly searchWord: string
  readonly searchTag: ReadonlyArray<string>
  readonly searchDifficulty: ReadonlyArray<number>
}
