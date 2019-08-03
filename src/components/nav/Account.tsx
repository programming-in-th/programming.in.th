/* React */
import React from 'react'

/* React Component */
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

/* Data model */
import firebase from 'firebase/app'
import 'firebase/auth'

class Account extends React.Component<{ user: firebase.User }> {
  firebaseLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload()
      })
  }

  render() {
    const { user } = this.props
    return (
      <React.Fragment>
        {this.props.user ? (
          <button id="user-panel" onClick={() => this.firebaseLogout()}>
            <p>{user.displayName === '' ? 'User' : user.displayName}</p>
            <img
              alt="avatar"
              src={
                user.photoURL === ''
                  ? '/assets/img/default-user.png'
                  : `${user.photoURL}`
              }
            />
          </button>
        ) : (
          <Link to="/login" id="user-panel">
            <p>Guest</p>
            <img alt="avatar" src="/assets/img/default-user.png" />
          </Link>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const AccountRender = connect(mapStateToProps)(Account) as any
