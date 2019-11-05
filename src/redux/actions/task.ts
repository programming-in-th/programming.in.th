import { ITaskPage } from '../types/task'

export const SET_TASK_PAGE_CONFIG = 'SET_TASK_PAGE_CONFIG'
export const setTaskPageConfig = (page: ITaskPage) => {
  return {
    type: SET_TASK_PAGE_CONFIG,
    taskPage: page
  }
}
