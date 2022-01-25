import firebaseApp from 'lib/firebase'
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth'

const auth = getAuth(firebaseApp)

const client_id =
  '345170514263-a4sc02c2hf5s2c4193nk884sk2r3nje1.apps.googleusercontent.com'

const callback = async (res) => {
  const FirebaseCredential = GoogleAuthProvider.credential(res.credential)

  await signInWithCredential(auth, FirebaseCredential)
}

export const onetap = () => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id,
      callback,
    })
    window.google.accounts.id.prompt()
  }
}
