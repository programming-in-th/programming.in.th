export interface IGeneralTask {
  id: string
  title: string
  tags: string[]
  solved: number
  score: number
  fullScore: number
  tried: boolean
  bookmarked: boolean
}

export interface IScore {
  task_id: string
  max: number
}

export interface ISolved {
  task_id: string
  count: number
}
