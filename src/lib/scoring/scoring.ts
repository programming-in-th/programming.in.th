import { SubmissionModel } from '@/prisma/models'
import { IGroup } from '@/types/submissions'

export function bestSubmission(submissions: SubmissionModel[]) {
  return Math.max(...submissions.map(submission => submission.score), 0)
}

export function sumSubtask(submissions: SubmissionModel[]) {
  if (submissions.length === 0) return 0

  const bestSubtask = (submissions[0].groups as unknown as IGroup[]).map(
    group => group.score
  )

  for (let i = 1; i < submissions.length; i++) {
    const groups = submissions[i].groups as unknown as IGroup[]

    for (let j = 0; j < groups.length; j++) {
      bestSubtask[j] = Math.max(bestSubtask[j], groups[j].score)
    }
  }

  return bestSubtask.reduce((prev, curr) => prev + curr, 0)
}
