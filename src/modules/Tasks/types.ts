export type Task = {
  id: string
  title: string
  tags: string[]
  solved: number
  score: number
  fullScore: number
  showTags: string[] | boolean
}
