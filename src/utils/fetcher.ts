import firebase from '../lib/firebase'

export const fetchAdminTask = async () => {
  const getAdminTask = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('getAdminTask')

  return await getAdminTask()
}

export const fetchSubmissionData = async (id: string) => {
  const getSubmission = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('getDetailedSubmissionData')

  return await getSubmission({ submission_id: id })
}

export const fetchUserList = async (type: string) => {
  const getAllUser = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable(type)

  return await getAllUser({})
}
