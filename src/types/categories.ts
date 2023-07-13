import { IGeneralTask } from './tasks'
export interface ICategory {
  id: string
  path: string[]
  title: string
  parentCategory?: ICategory
  childCategories?: ICategory[]
  childTasks?: IGeneralTask[]
  taskIds: string[]
}
