import firebase from 'firebase'

export interface IUserState {
  readonly user: 'LOADING' | firebase.User | null
}
