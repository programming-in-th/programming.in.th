import { ISubmission } from '../@types/submission'

export const transformStatus = (detail: ISubmission) => {
  if (detail === undefined) return

  if (detail.status === 'in_queue') {
    return Object.assign({}, detail, {
      status: 'Pending',
      points: 'Pending',
      memory: 0,
      time: 0
    })
  }

  return detail
}
