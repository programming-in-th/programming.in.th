/* React */
import React, { useState } from "react"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, teal, blue, pink, indigo, deepOrange } from "@material-ui/core/colors";
import Backdrop from '@material-ui/core/Backdrop';

interface accountState {
  toggleDetail: Boolean,
  toggleSignUp: Boolean,
  sign: Boolean,
  displayName: String,
  avatar: String
}

interface buttonProps {
  color: any,
  icon?: String,
  text: String,
  onClick?: any
}

const AccountButton = (props : buttonProps) => {
  return (
    <MuiThemeProvider theme={createMuiTheme({palette: {primary: props.color}})}>
        <Button variant="contained" color="primary" onClick={() => props.onClick ? props.onClick() : null}>
          {props.icon ? <i className="material-icons">{props.icon}</i> : null }
          {props.text}
        </Button>
    </MuiThemeProvider>
  )
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

  loginWithGmail(){
    let provider = new firebase.auth.GoogleAuthProvider();
    this.toggleDetail();
    firebase.auth().signInWithPopup(provider).then(function(result:any) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error:any) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    this.toggleDetail();
    firebase.auth().signInWithPopup(provider).then(function(result:any) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  toggleDetail(){
    this.setState({
      toggleDetail: !this.state.toggleDetail
    })
    this.setState({
      toggleSignUp: false
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
          <div id = {this.state.sign ? "user-logout" : "user-control"}>
            {this.state.toggleSignUp ?
              <Fade in={this.state.toggleSignUp ? true : false}>
                <div id="account-container">
                  {/* TODO : Minimum password characters and password confirmation */}

                  <TextField id="user-textfield" label="Username" margin="normal" variant="outlined" /> 
                  <TextField id="email-textfield" label="Email" margin="normal" variant="outlined" /> 
                  <TextField id="pass-textfield" label="Password" margin="normal" type="password" variant="outlined" /> 
                  <TextField id="confirm-textfield" label="Confirm Password" margin="normal" type="password" variant="outlined" /> 

                  <AccountButton color={blue} icon="person_add" text="Sign Up" />
                  <AccountButton color={teal} icon="keyboard_arrow_left" text="Back to Login" onClick={() => this.toggleSignUp()} />
                </div>
              </Fade>
              :
              <>
              <Fade in={!this.state.toggleSignUp ? true : false}>
              { this.state.sign ?
                <div id="account-container">
                  <AccountButton color={red} icon="vpn_key" text="Logout" onClick={() => this.firebaseLogout()} />
                </div>              
              :
                <div id="account-container">
                  <TextField id="email-textfield" label="Email" margin="normal" variant="outlined" /> 
                  <TextField id="pass-textfield" label="Password" margin="normal" type="password" variant="outlined" /> 

                  <AccountButton color={blue} icon="account_circle" text="Login" />
                  <AccountButton color={pink} icon="person_add" text="Sign Up" onClick={() => this.toggleSignUp()} />
                  <AccountButton color={deepOrange} icon="email" text="Login with Google" onClick={() => this.loginWithGmail()} />
                  <AccountButton color={indigo} icon="thumb_up" text="Login with Facebook" onClick={() => this.loginWithFacebook()} />
                </div>
              }
              </Fade>
              </>
            }
          </div>
        : null}
        <div id="account-backdrop">
          <Backdrop open={this.state.toggleDetail ? true : false} onClick={() => this.toggleDetail()}></Backdrop>
        </div>
      </>
    )
  }
}
export default function AccountRender() {
  return(<Account/>);
}
