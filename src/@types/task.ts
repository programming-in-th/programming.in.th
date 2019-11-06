export interface ITask {
  problem_id: string
  author: string
  path: string
  url: string
  title: string
  time_limit: number
  memory_limit: number
  difficulty: number
  tags: ReadonlyArray<string>
  source: string
}
