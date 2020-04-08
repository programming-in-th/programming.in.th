import firebase from '../../lib/firebase'

const client_id =
  '408883593148-sm3fup3jg8b932h1lolml6cklu8ntlko.apps.googleusercontent.com'

const callback = async res => {
  const FirebaseCredential = firebase.auth.GoogleAuthProvider.credential(
    res.credential
  )

  await firebase.auth().signInWithCredential(FirebaseCredential)
}

export const onetap = () => {
  window.google.accounts.id.initialize({
    client_id,
    callback
  })

  window.google.accounts.id.prompt()
}
