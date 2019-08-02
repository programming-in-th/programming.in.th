/* React */
import React from 'react'

/* React Component */
import { Link } from 'react-router-dom'

/* Data model */
import firebase from 'firebase/app'
import 'firebase/auth'

interface accountState {
  toggleDetail: Boolean
  toggleSignUp: Boolean
  sign: Boolean
  displayName: String
  avatar: String
}

class Account extends React.Component<{}, accountState> {
  constructor(props: any) {
    super(props)
    this.state = {
      toggleDetail: false,
      toggleSignUp: false,
      sign: false,
      displayName: '',
      avatar: ''
    }
  }

  reloadState() {
    const account = firebase.auth().currentUser
    if (account) {
      this.setState({
        displayName: account.displayName ? account.displayName : '',
        avatar: account.photoURL ? account.photoURL : ''
      })
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(() => {
      this.reloadState()
    })
  }

  firebaseLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload()
      })
  }

  render() {
    return (
      <React.Fragment>
        {firebase.auth().currentUser ? (
          <button id="user-panel" onClick={() => this.firebaseLogout()}>
            <p>
              {this.state.displayName == '' ? 'User' : this.state.displayName}
            </p>
            <img
              src={
                this.state.avatar == ''
                  ? '/assets/img/default-user.png'
                  : `${this.state.avatar}`
              }
            />
          </button>
        ) : (
          <Link to="/login" id="user-panel">
            <p>
              {this.state.displayName == '' ? 'Guest' : this.state.displayName}
            </p>
            <img
              src={
                this.state.avatar == ''
                  ? '/assets/img/default-user.png'
                  : `${this.state.avatar}`
              }
            />
          </Link>
        )}
      </React.Fragment>
    )
  }
}

export default function AccountRender() {
  return <Account />
}
