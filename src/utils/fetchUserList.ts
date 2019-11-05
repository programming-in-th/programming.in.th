import firebase from '../lib/firebase'

export const fetchUserList = async (type: string) => {
  const getAllUser = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable(type)

  return await getAllUser({})
}
