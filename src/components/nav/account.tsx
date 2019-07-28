/* React */
import React, { useState } from "react"

/* React Component */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"

interface accountState {
  toggleDetail: Boolean,
  toggleSignUp: Boolean,
  sign: Boolean,
  displayName: String,
  avatar: String,
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
      avatar: "",
    }
  }

  reloadState() {
    var account = firebase.auth().currentUser;
    if(account) {
      console.log("yes");
      this.setState({
        sign:true,
        displayName: account.displayName ? account.displayName : "",
        avatar: account.photoURL ? account.photoURL : ""
      })
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(account => {
      this.reloadState();
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
        <Link to="/login" id="user-panel">
          <p>{this.state.displayName == "" ? "Guest" : this.state.displayName}</p>
          <img src={this.state.avatar == "" ? "/assets/img/default-user.png" : `${this.state.avatar}`} />
        </Link>
      </>
    )
  }
}
export default function AccountRender() {
  return(<Account/>);
}
