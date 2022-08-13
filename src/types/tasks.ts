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

export interface Score {
  taskId: string
  max: number
}

export interface Solved {
  taskId: string
  count: number
}
