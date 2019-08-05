import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'

export const LOAD_TAGS = 'LOAD_TAGS'
export const loadTags = () => {
  // TODO: Implement
}

export const loadTasks = (
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

export const REQUEST_TASKS = 'REQUEST_TASKS'
const requestTasks = () => {
  return {
    type: REQUEST_TASKS
  }
}

export const RECEIVE_TASKS = 'RECEIVE_TASKS'
const receiveTasks = (data: any) => {
  return {
    type: RECEIVE_TASKS,
    taskList: data
  }
}

export const LOAD_DETAILED_TASK = 'LOAD_DETAILED_TASK'
