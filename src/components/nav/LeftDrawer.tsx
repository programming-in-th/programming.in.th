/* React */
import React from 'react'

/* React Component */
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import '../../assets/css/nav.css'

/* React Util */
import {
  Icon,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core/'

/* Data model */
import firebase from 'firebase/app'
import 'firebase/auth'

export default function LeftDrawer() {
  const [state, setState] = React.useState(false)
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setState(open)
  }

  interface drawerProps {
    icon: String
    to?: String
    text: String
    onClick?: any
  }

  const DrawerIcon = (props: drawerProps) => {
    return (
      <>
        {props.to ? (
          <ListItem
            button
            key={'props.text'}
            component={Link}
            to={`${props.to}`}
          >
            <ListItemIcon>
              <Icon className="grey-color">{props.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={props.text} className="grey-color" />
          </ListItem>
        ) : (
          <ListItem
            to=""
            button
            key={'props.text'}
            component={Link}
            onClick={() => props.onClick()}
          >
            <ListItemIcon>
              <Icon className="grey-color">{props.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={props.text} className="grey-color" />
          </ListItem>
        )}
      </>
    )
  }

  let firebaseLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload()
      })
  }

  const sideList = () => (
    <div
      className="drawer-list"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <DrawerIcon icon="home" to="/" text="Home" />
        <DrawerIcon icon="functions" to="/tasks" text="Tasks" />
        <DrawerIcon icon="school" to="/learn" text="Learn" />
        <DrawerIcon icon="forum" to="/forum" text="Forum" />
        <DrawerIcon icon="featured_play_list" to="/exams" text="Exams" />
      </List>
      <Divider />
      {firebase.auth().currentUser ? (
        <DrawerIcon
          icon="exit_to_app"
          text="Logout"
          onClick={() => firebaseLogout()}
        />
      ) : (
        <DrawerIcon icon="exit_to_app" text="Login" to="/login" />
      )}
    </div>
  )
  return (
    <div className="action-icon-responsive">
      <button
        id="menu-icon"
        className="action-icon"
        onClick={toggleDrawer(!state)}
      >
        <a className="nav-icon ">
          <i className="material-icons">menu</i>
        </a>
      </button>
      <SwipeableDrawer
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  )
}
