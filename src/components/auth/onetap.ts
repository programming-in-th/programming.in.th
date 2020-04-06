import firebase from '../../lib/firebase'

const PUBLIC_CLIENT_ID =
  '408883593148-sm3fup3jg8b932h1lolml6cklu8ntlko.apps.googleusercontent.com'

const callback = async res => {
  const FirebaseCredential = await firebase.auth.GoogleAuthProvider.credential(
    res.credential
  )
  await firebase.auth().signInWithCredential(FirebaseCredential)
}

export const onetap = () => {
  ;(window as any).google.accounts.id.initialize({
    client_id: PUBLIC_CLIENT_ID,
    callback: callback
  })
  ;(window as any).google.accounts.id.prompt()
}
