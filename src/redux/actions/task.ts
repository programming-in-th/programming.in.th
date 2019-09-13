import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ITask } from '../types/task'
import { IAppState } from '..'
import firebase from 'firebase'

export const LOAD_TAGS = 'LOAD_TAGS'
export const loadTags = () => {
  // TODO: Implement
}

export const loadTasksList = (
  limit: number,
  min_difficulty: number,
  max_difficulty: number,
  tags: Array<String>
) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestTasks())
    try {
      const params: Object = {
        limit: limit,
        min_difficulty: min_difficulty !== -1 ? min_difficulty : 0,
        max_difficulty:
          max_difficulty !== -1 ? max_difficulty : Number.MAX_SAFE_INTEGER,
        tags: tags && tags.length ? tags : []
      }
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getTasksWithFilter')(params)
      dispatch(receiveTasks(response.data))
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
const receiveTasks = (data: ITask[]) => {
  return {
    type: RECEIVE_TASKS_LIST,
    taskList: data
  }
}

export const loadTask = (id: string) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestTask())
    try {
      const params: Object = {
        problem_id: id
      }
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getProblemMetadata')(params)
      dispatch(receiveTask(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const REQUEST_TASK = 'REQUEST_TASK'
const requestTask = () => {
  return {
    type: REQUEST_TASK
  }
}

export const RECEIVE_TASK = 'RECEIVE_TASK'
const receiveTask = (task: ITask | undefined) => {
  return {
    type: RECEIVE_TASK,
    currentTask: task
  }
}
