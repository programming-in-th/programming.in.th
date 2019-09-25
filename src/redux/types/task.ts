export interface ITaskState {
  readonly currentTask: ITask | null
  readonly taskList: ReadonlyArray<ITask>
  readonly tags: ReadonlyArray<String>
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
