import firebase from '../../lib/firebase'

const client_id =
  '368665051551-cqf20qioibtjlms8radrlfspq89q215o.apps.googleusercontent.com'

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

  window.google.accounts.id.prompt(msg => {
    console.log(msg.getNotDisplayedReason())
  })
}
