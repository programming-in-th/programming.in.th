import fetch from 'isomorphic-unfetch'
import { config } from '../config'

export const getProblemIDs = async () => {
  // return []

  const data = await fetch(`${config.baseURL}/getAllProblemIDs`).then(o =>
    o.json()
  )

  const paths = data.map((id: string) => {
    return { params: { id } }
  })

  return paths
}
