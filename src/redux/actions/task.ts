import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'
import { ITask } from '../types/task'

export const LOAD_TAGS = 'LOAD_TAGS'
export const loadTags = () => {
  // TODO: Implement
}

export const loadTasksList = (
  min_difficulty: number,
  max_difficulty: number,
  tags: Array<String>
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(requestTasks())
    try {
      let url =
        'https://us-central1-grader-ef0b5.cloudfunctions.net/getAllTasksWithFilter?limit=10'
      if (min_difficulty !== -1) {
        url += '&min_difficulty=' + min_difficulty
      }
      if (max_difficulty !== -1) {
        url += '&max_difficulty=' + max_difficulty
      }
      if (tags && tags.length) {
        let tagString = '&tags=['
        tags.forEach(tag => {
          tagString += '"' + tag + '",'
        })
        tagString += ']'
        url += tagString
      }
      const response = (await axios.get(url)).data
      dispatch(receiveTasks(response))
    } catch (error) {
      console.log(error)
    }
  }
}

export const REQUEST_TASKS_LIST = 'REQUEST_TASKS_LIST'
const requestTasks = () => {
  return {
    type: REQUEST_TASKS_LIST
  }
}

export const RECEIVE_TASKS_LIST = 'RECEIVE_TASKS_LIST'
const receiveTasks = (data: any) => {
  return {
    type: RECEIVE_TASKS_LIST,
    taskList: data
  }
}

export const loadTask = (id: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any): void => {
    const task: ITask = getState().tasks.taskList.find(
      (task: ITask) => task.problem_id === id
    )
    dispatch(loadCurrentTask(task))
  }
}

export const LOAD_CURRENT_TASK = 'LOAD_CURRENT_TASK'
const loadCurrentTask = (task: ITask) => {
  return {
    type: LOAD_CURRENT_TASK,
    currentTask: task
  }
}
