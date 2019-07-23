/* React */
import React from "react"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

interface accountState {
  toggleDetail: Boolean,
  sign: Boolean,
  displayName: String,
  avatar: String
}

class Account extends React.Component<{}, accountState> {
  constructor(props:any){
    super(props);
    this.state = {
      toggleDetail: false,
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
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
              <>
              {/* new future debug */}
              <i>=> only login with Gmail available</i>
              <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} /> 
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
