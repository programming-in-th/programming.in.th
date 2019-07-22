/* React */
import React from "react"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"

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

export default function AccountRender() {
  return(<AccountControl/>);
}
