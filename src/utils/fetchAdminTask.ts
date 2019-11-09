import firebase from '../lib/firebase'

export const fetchAdminTask = async () => {
  const getAdminTask = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable('getAdminTask')

  return await getAdminTask()
}
