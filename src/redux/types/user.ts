import firebase from 'firebase/app'

export interface IUserState {
  readonly user: 'LOADING' | firebase.User | null
  readonly admin: boolean
}
