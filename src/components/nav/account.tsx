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
  firebaseLogout(){
    firebase.auth().signOut().then(() => {
      window.location.reload();
    })
  }

  render(){
    return(
      <>
      {firebase.auth().currentUser ?
        <button id="user-panel" onClick={() => this.firebaseLogout()}>
          <p>{this.state.displayName == "" ? "User" : this.state.displayName}</p>
          <img src={this.state.avatar == "" ? "/assets/img/default-user.png" : `${this.state.avatar}`} />
        </button>
      :
        <Link to="/login" id="user-panel">
          <p>{this.state.displayName == "" ? "Guest" : this.state.displayName}</p>
          <img src={this.state.avatar == "" ? "/assets/img/default-user.png" : `${this.state.avatar}`} />
        </Link>
      }
      </>
    )
  }
}
export default function AccountRender() {
  return(<Account/>);
}
