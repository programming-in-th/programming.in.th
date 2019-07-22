/* React */
import React, {Component, useState} from "react"

/* React Component */
import { Link } from "react-router-dom"
import "../assets/css/nav.css"
import SwipeableTemporaryDrawer from "./left_drawer"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"


interface NavProps {
  icon: String,
  to: String
}

const LinkIcon = (props:NavProps) => {
    return(
      <Link to={`${props.to}`}>
        <a className="nav-icon link-icon-responsive">
          <i className="material-icons">{props.icon}</i>
        </a>
      </Link>
    )
}

interface ActionProps {
  icon: String,
  onClick?: any,
  id?: String,
}

const ActionIcon = (props:ActionProps) => {
  return(
    <button id={'props.id'} className="action-icon" onClick={() => props.onClick()}>
      <a className="nav-icon action-icon-responsive">
        <i className="material-icons">{props.icon}</i>
      </a>
    </button>
  )
}

interface accountState {
  toggleDetail: Boolean,
  sign: Boolean,
  displayName: String,
  avatar: String
}

class AccountControl extends React.Component<{}, accountState> {
  constructor(props:any){
    super(props);
    this.state = {
      toggleDetail: false,
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
      } else {
      }
    })
  }

  toggleDetail(){
    this.setState({
      toggleDetail: !this.state.toggleDetail
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

  firebaseLogout(){
    firebase.auth().signOut().then(() => {
      window.location.reload();
    })
  }

  render(){
    return(
      <>
        <button id="user-panel" onClick={() => this.toggleDetail()}>
          {this.state.sign ?
            <>
              <p>{this.state.displayName}</p>
              <img src={`${this.state.avatar}`} />
            </>
          :
            <>
              <p>Guest</p>
              <img src="/assets/img/default-user.png" />
            </>
          }
        </button>
        {this.state.toggleDetail ?
          <div id="user-control">
            {this.state.sign ?
              <button onClick={() => this.firebaseLogout()}>
                <i className="material-icons">vpn_key</i>
                Logout
              </button>
            :
              <button onClick={() => this.loginWithGmail()}>
                <i className="material-icons">email</i>
                Login with Gmail
              </button>
            }
          </div>
        : null}
      </>
    )
  }
}

export default () => {
    return(
      <>
        <nav id="main-nav">
          <div>
            <SwipeableTemporaryDrawer />            
            <LinkIcon icon="home" to="/" />
            <LinkIcon icon="functions" to="/tasks" />
            <LinkIcon icon="school" to="/learn" />
            <LinkIcon icon="forum" to="/forum" />
            <LinkIcon icon="featured_play_list" to="/exam" />
          </div>
          <div style={{display:"inline-flex",flexDirection:"row-reverse"}}>
            <AccountControl />
          </div>
        </nav>
      </>
    )
}