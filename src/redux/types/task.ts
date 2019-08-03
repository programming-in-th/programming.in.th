export interface TaskListState {
  taskList: Object[]
  tags: Array<String>
  status: 'LOADING' | 'SUCCESS'
}

export interface TaskList {
  title: string
  difficulty: number
  tags: Array<string>
}
