/* React */

import React, {Component, useState} from "react"

/* React Component */
import { Link } from "react-router-dom"

import "../assets/css/nav.css"
/* Data model */
import firebase from "firebase/app"
import "firebase/auth"
import LeftDrawer from "./left_drawer"


interface NavProps {
  icon: String,
  to: String,
  responsive: Boolean
}

const LinkIcon = (props:NavProps) => {
    return(
      <Link to={`${props.to}`}>
        {props.responsive ?
          <a className="nav-icon link-icon-responsive">
            <i className="material-icons">{props.icon}</i>
          </a>
        :
          <a className="nav-icon">
            <i className="material-icons">{props.icon}</i>
          </a>
        }
      </Link>
    )
}

interface ActionProps {
  icon: String,
  onClick?: any,
  id?: String,
  responsive: Boolean
}

const ActionIcon = (props:ActionProps) => {
  return(
    <button id={'props.id'} className="action-icon" onClick={() => props.onClick()}>
      {props.responsive ? 
        <a className="nav-icon action-icon-responsive">
          <i className="material-icons">{props.icon}</i>
        </a>
      :
        <a className="nav-icon">
          <i className="material-icons">{props.icon}</i>
        </a>
      }
      
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

interface leftMenuProps {
  visible: Boolean,
  toggle: Function
}

const LeftMenu = (props: leftMenuProps) => {
  if(props.visible) {
    return <LeftDrawer toggle={props.toggle}/>;
  } else {
    return null;
  }
}

interface props {
  title?: string
}

export default (props:props) => {

    const [leftMenu, setLeftMenu] = useState(false);

    function toggleLeftMenu(){
      setLeftMenu(!leftMenu);
    }

    return(
      <>
        <nav id="main-nav">
        <LeftMenu visible={leftMenu} toggle={toggleLeftMenu} />
          <div>
            <ActionIcon id="menu-icon" responsive={true} icon="menu" onClick={() => toggleLeftMenu()} />
            <LinkIcon responsive={true} icon="home" to="/" />
            <LinkIcon responsive={true} icon="functions" to="/tasks" />
            <LinkIcon responsive={true} icon="featured_play_list" to="/exam" />
            <LinkIcon responsive={true} icon="forum" to="/forum" />
            <LinkIcon responsive={true} icon="school" to="/learn" />
          </div>
          <div style={{display:"inline-flex",flexDirection:"row-reverse"}}>
            <AccountControl />
          </div>
        </nav>
      </>
    )
}