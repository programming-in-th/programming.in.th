import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { IAppState } from '..'
import { INode } from '../types/learn'
import firebase from 'firebase'
import axios from 'axios'

export const loadMenu = () => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestMenu())
    try {
      const response = await firebase
        .app()
        .functions('asia-east2')
        .httpsCallable('getLearnMenu')()
      const nodes: INode[] = response.data
      nodes.sort((a: INode, b: INode) => {
        return a.name.localeCompare(b.name)
      })
      dispatch(receiveMenu(nodes))
    } catch (error) {
      console.log(error)
    }
  }
}

export const loadContent = (url: string) => {
  return async (
    dispatch: ThunkDispatch<IAppState, {}, AnyAction>
  ): Promise<void> => {
    dispatch(requestContent())
    try {
      const response = await axios.get(url)
      dispatch(receiveContent(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const REQUEST_MENU = 'REQUEST_MENU'
const requestMenu = () => {
  return {
    type: REQUEST_MENU
  }
}

export const RECEIVE_MENU = 'RECEIVE_MENU'
const receiveMenu = (data: INode[]) => {
  return {
    type: RECEIVE_MENU,
    menu: data
  }
}

export const REQUEST_CONTENT = 'REQUEST_CONTENT'
const requestContent = () => {
  return {
    type: REQUEST_CONTENT
  }
}

export const RECEIVE_CONTENT = 'RECEIVE_CONTENT'
const receiveContent = (data: string) => {
  return {
    type: RECEIVE_CONTENT,
    currentContent: data
  }
}
