import { Session } from 'next-auth'

import checkOwnerPermissionOnAssessment from './checkOwnerPermissionOnAssessment'
import checkUserPermissionOnTask from './checkUserPermissionOnTask'

const checkUserPermissionOnSubmission = async (
  session: Session | Session['user'],
  submission: {
    userId: string | null | undefined
    taskId: string
    assessmentId: string | null
  }
) => {
  const user = 'user' in session ? session.user : session

  if (user.admin) return true
  if (!user.id) return false

  if (
    submission.userId === user.id &&
    (await checkUserPermissionOnTask(user, submission.taskId))
  ) {
    return true
  }

  return checkOwnerPermissionOnAssessment(user, submission.assessmentId)
}

export default checkUserPermissionOnSubmission
