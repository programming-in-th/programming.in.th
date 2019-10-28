import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyCjd-glhd1Rl_QJUfLp4w2zxEB94bhIsJE',
  authDomain: 'grader-ef0b5.firebaseapp.com',
  databaseURL: 'https://grader-ef0b5.firebaseio.com',
  projectId: 'grader-ef0b5',
  storageBucket: 'grader-ef0b5.appspot.com',
  messagingSenderId: '408883593148',
  appId: '1:408883593148:web:8e89a2b223dc55f9'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-east2')
}

export default firebase
