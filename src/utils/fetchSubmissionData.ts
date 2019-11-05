import firebase from '../lib/firebase'

export const fetchSubmissionData = async (id: string) => {
  const getSubmission = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('getDetailedSubmissionData')

  return await getSubmission({ submission_id: id })
}
