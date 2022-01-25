import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBcAEoDKxjVCLp6JzVu2yAOksxVrOA74YU',
  authDomain: 'proginth.firebaseapp.com',
  databaseURL: 'https://proginth.firebaseio.com',
  projectId: 'proginth',
  storageBucket: 'proginth.appspot.com',
  messagingSenderId: '345170514263',
  appId: '1:345170514263:web:b60cd3d015e4b4d464ee12',
  measurementId: 'G-9KZEYQ24KD',
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
