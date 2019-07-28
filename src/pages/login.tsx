/* React */
import React, { useState } from "react"

/* React Component */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import "../assets/css/login.css"

interface buttonProps {
  id?: String,
  icon?: String,
  text: String,
  onClick?: any
}

const AccountButton = (props : buttonProps) => {
  console.log(props.id)
  return (
    <Button id={`${props.id ? props.id : ""}`} variant="contained" color="primary" onClick={() => props.onClick ? props.onClick() : null}>
      {props.icon ? <i className="material-icons">{props.icon}</i> : null }
        {props.text}
    </Button>
  )
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google , Facebook , Etc as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccess: () => {
      window.history.back();
    }
  }
} as firebaseui.auth.Config;

let LoginPage = (props: any) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  let submitLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function(result:any) {
      let nowUser = firebase.auth().currentUser;
      if(nowUser) if(!nowUser.emailVerified) {
        firebase.auth().signOut();
        setError("Please Verify Your Email");
      } else window.history.back();
    }).catch(function(error) {
      console.log("noob");
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorMessage);
      // ...
    });
  }
  return (
    <form onSubmit={() => submitLogin()} style={{width: '100%'}}>
      <div id="main-text">Login</div>
      <TextField id="textfield" label="Email" margin="normal" variant="outlined" onChange={(event) => setEmail(event.target.value)} /> 
      <TextField id="textfield" label="Password" margin="normal" type="password" variant="outlined" onChange={(event) => setPass(event.target.value)}/> 
      {error ? <p style={{color: "red"}}>{error}</p> : null}
      <AccountButton id="login-button" icon="account_circle" text="LOGIN" onClick={() => submitLogin()}/>
      <div id="account-form">
        <AccountButton id="grey-button" icon="person_add" text="Register account" onClick={() => props.setState("register")}/>
        <AccountButton id="grey-button" icon="apps" text="Different Method" onClick={() => props.setState("oauth")}/>
      </div>
    </form>
  )
}

let RegisterPage = (props: any) => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [passC, setPassC] = useState("")
  const [error, setError] = useState("")

  let submitRegister = () => {
    if(pass != passC) {
      setError("password not match");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(result: any) {
      let nowUser = firebase.auth().currentUser;
      console.log("hello");
      if(nowUser) {
        console.log("send email");
        nowUser.sendEmailVerification();
      } else {
        console.log("failed");
      }
      firebase.auth().signOut();
      window.history.back();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      setError(errorMessage);

    });
  }

  return(
    <form onSubmit={() => submitRegister()} style={{width: '100%'}}>
      <div id="main-text">Register</div>
      <TextField id="textfield" label="Email" margin="normal" variant="outlined" onChange={(event) => setEmail(event.target.value)}/> 
      <TextField id="textfield" label="Password" margin="normal" type="password" variant="outlined" onChange={(event) => setPass(event.target.value)}/> 
      <TextField id="textfield" label="Confirm Password" margin="normal" type="password" variant="outlined" onChange={(event) => setPassC(event.target.value)}/> 
      {error ? <p style={{color: "red"}}>{error}</p> : null}
      <AccountButton icon="person_add" id="login-button" text="Sign Up" onClick={() => submitRegister()}/>
      <AccountButton id="grey-button" icon="apps" text="Back to Main page" onClick={() => props.setState("main")}/>
    </form>
  )
}

let OAuthPage = (props: any) => {
  return(
    <>
      <div id="oauth-text">Use Different Method</div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> 
      <AccountButton id="grey-button" icon="apps" text="Back to Main page" onClick={() => props.setState("main")}/>
    </>
  )
}

let LoginSession = () => {
  const [state, setState] = useState("main");
  return (
    <>
    {firebase.auth().currentUser ?
      firebase.auth().signOut().then(() => {
        window.location.reload();
      }) 
    :
      <div id="account-container">
        {state == "main" ? 
          <LoginPage setState={setState} />
        :
          state == "register" ?
            <RegisterPage setState={setState} />
          :
            <OAuthPage setState={setState} />
        }
      </div>
    }
    </>
  )
}

export default LoginSession;