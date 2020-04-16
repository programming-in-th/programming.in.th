import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyDCFpRluW6B4kVMZUDO08B9m8oxSWehqPk',
  authDomain: 'prginth.firebaseapp.com',
  databaseURL: 'https://prginth.firebaseio.com',
  projectId: 'prginth',
  storageBucket: 'prginth.appspot.com',
  messagingSenderId: '368665051551',
  appId: '1:368665051551:web:737f41c1d2271d6d9efdaa',
  measurementId: 'G-RPP5SKLC6B'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-east2')
}

export default firebase
