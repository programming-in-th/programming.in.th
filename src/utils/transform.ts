import { ISubmission } from '../redux/types/submission'
import firebase from 'firebase/app'

export const transformStatus = (detail: ISubmission) => {
  if (detail === undefined) return

  if (detail.status === 'in_queue') {
    return Object.assign({}, detail, {
      status: 'PENDING',
      points: 'PENDING',
      memory: 0,
      time: 0
    })
  }

  return detail
}

export interface ITimeObject {
  _seconds: number
  _nanoseconds: number
}

export const transformDate = (time: ITimeObject) => {
  const firebaseDate = new firebase.firestore.Timestamp(
    time._seconds,
    time._nanoseconds
  )
  const jsDate = firebaseDate.toDate()
  return jsDate.toLocaleString()
}
