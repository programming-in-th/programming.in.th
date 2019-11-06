interface ISubmission {
  uid: string
  submission_id: string
  username: string
  problem_id: string
  problem_name: string
  language: string
  status: string
  points: number
  time: number
  memory: number
  timestamp: Date
  humanTimestamp: string
  code?: string
  hideCode: boolean
}

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
