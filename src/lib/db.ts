import firebase from './firebase'

const firestore = firebase.firestore()

export const updateUser = (
  uid: string,
  data: firebase.firestore.DocumentData
): Promise<void> => {
  return firestore.collection('users').doc(uid).update(data)
}

export const createUser = (
  uid: string,
  data: firebase.firestore.DocumentData
): Promise<void> => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export const getCurrentUserData = async (
  uid: string
): Promise<null | firebase.firestore.DocumentData> => {
  const ref = firestore.collection('users').doc(uid)

  const doc = await ref.get()
  if (doc.exists) {
    return doc.data()
  } else {
    return null
  }
}
