import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { IAppState } from '..'
import { INode } from '../types/learn'
import firebase from 'firebase'
import axios from 'axios'

export const loadMenu = (article_id: string) => {
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
      const mapToStore = new Map<string, INode>()
      for (const node of nodes) {
        if (node.article_id) {
          mapToStore.set(node.article_id, node)
        } else {
          for (const sub_node of node.articles!) {
            mapToStore.set(sub_node.article_id!, sub_node)
          }
        }
      }
      dispatch(storeMap(mapToStore))
      dispatch(receiveMenu(nodes))
      if (article_id) dispatch(loadContent(mapToStore.get(article_id)!.url!))
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
      const data = response.data.cells
      const snippets: string[] = []
      for (const cell of data) {
        if (cell.cell_type === 'markdown') {
          for (const snippet of cell.source) {
            snippets.push(snippet)
          }
        }
      }
      dispatch(receiveContent(snippets))
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
const receiveContent = (data: string[]) => {
  return {
    type: RECEIVE_CONTENT,
    currentContent: data
  }
}

export const STORE_MAP = 'STORE_MAP'
const storeMap = (mapToStore: Map<string, INode>) => {
  return {
    type: STORE_MAP,
    mapToStore: mapToStore
  }
}
