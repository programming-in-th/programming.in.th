import firebase from 'firebase'

export interface UserState {
  user: firebase.User | null
}
