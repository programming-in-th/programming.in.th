import firebase from 'firebase'

export interface IUserState {
  readonly user: firebase.User | null
}
