/* React */
import React, { useState } from "react"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';


interface accountState {
  toggleDetail: Boolean,
  toggleSignUp: Boolean,
  sign: Boolean,
  displayName: String,
  avatar: String
}

class Account extends React.Component<{}, accountState> {
  constructor(props:any){
    super(props);
    this.state = {
      toggleDetail: false, 
      toggleSignUp: false,
      sign: false,
      displayName: "",
      avatar: ""
    }
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  } as firebaseui.auth.Config;

  componentWillMount(){
    firebase.auth().onAuthStateChanged(account => {
      if(account){
        // Signed in.
        this.setState({
          sign:true,
          displayName: account.displayName ? account.displayName : "",
          avatar: account.photoURL ? account.photoURL : ""
        })
      }
    })
  }

  toggleDetail(){
    this.setState({
      toggleDetail: !this.state.toggleDetail
    })
  }

  firebaseLogout(){
    firebase.auth().signOut().then(() => {
      window.location.reload();
    })
  }

  toggleSignUp() {
    this.setState({
      toggleSignUp: !this.state.toggleSignUp
    })
  }

  render(){
    return(
      <>
        <button id="user-panel" onClick={() => this.toggleDetail()}>
          <p>{this.state.displayName == "" ? "Guest" : this.state.displayName}</p>
          <img src={this.state.avatar == "" ? "/assets/img/default-user.png" : `${this.state.avatar}`} />
        </button>
        {this.state.toggleDetail ?
          <div id="user-control">
            {this.state.toggleSignUp ?
              <Fade in={this.state.toggleSignUp ? true : false}>
                <div id="account-container">
                  <TextField id="user-textfield" label="Username" margin="normal" variant="outlined" /> 
                  <TextField id="email-textfield" label="Email" margin="normal" variant="outlined" /> 
                  <TextField id="pass-textfield" label="Password" margin="normal" type="password" variant="outlined" /> 
                  <Button variant="contained" color="primary">
                    <i className="material-icons">person_add</i>
                    Sign Up
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => this.toggleSignUp()}>
                    <i className="material-icons">keyboard_arrow_left</i>
                    Back to Login
                  </Button>
                </div>
              </Fade>
              :
              <>
              { this.state.sign ?
                <button onClick={() => this.firebaseLogout()}>
                  <i className="material-icons">vpn_key</i>
                  Logout
                </button>
              :
                <div id="account-container">
                  <TextField id="email-textfield" label="Email" margin="normal" variant="outlined" /> 
                  <TextField id="pass-textfield" label="Password" margin="normal" type="password" variant="outlined" /> 
                  <Button variant="contained" color="primary">
                    <i className="material-icons">account_circle</i>
                    Log In
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => this.toggleSignUp()}>
                    <i className="material-icons">person_add</i>
                    Sign Up
                  </Button>
                  <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} /> 
                </div>
              }
              </>
            }
          </div>
        : null}
      </>
    )
  }
}
export default function AccountRender() {
  return(<Account/>);
}
