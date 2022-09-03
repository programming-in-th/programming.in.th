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
  taskId: string
  max: number
}

export interface ISolved {
  taskId: string
  count: number
}
