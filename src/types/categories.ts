import { IGeneralTask } from './tasks'
export interface ICategory {
  path: string[]
  title: string
  children: ICategory[] | IGeneralTask[]
  taskIds: string[]
}
