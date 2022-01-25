import firebaseApp from 'lib/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

const functions = getFunctions(firebaseApp, 'asia-east2')

export const fetchFromFirebase = async (type: string, param?: Object) => {
  const get = httpsCallable(functions, type)

  return (await get(param)).data as any
}
