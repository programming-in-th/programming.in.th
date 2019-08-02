import * as actionTypes from './task_list_action_types'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import axios from 'axios'

export const loadTags = () => {
  // TODO: Implement
}

export const loadTasksSync = (taskList: Array<Object>) => {
  return {
    type: actionTypes.LOAD_TASKS,
    taskList: taskList
  }
}

export const loadTasks = (
  min_difficulty: number,
  max_difficulty: number,
  tags: Array<String>
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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
      dispatch(loadTasksSync(response))
    } catch (error) {
      console.log(error)
    }
  }
}
