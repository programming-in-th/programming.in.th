export interface ITaskState {
  readonly cacheUntil: number | null
  readonly taskPage: ITaskPage
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
  readonly source: string
}

export interface ITaskPage {
  readonly currentPage: number
  readonly currentPageSize: number | undefined
  readonly searchWord: string
  readonly searchTag: ReadonlyArray<string>
  readonly searchDifficulty: ReadonlyArray<number>
  readonly hideTag: boolean
}
