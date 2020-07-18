import firebase from 'lib/firebase'

export const fetchFromFirebase = async (type: string, param?: Object) => {
  const get = firebase.app().functions('asia-east2').httpsCallable(type)

  return (await get(param)).data
}
