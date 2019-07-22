import React from 'react';
import Icon from '@material-ui/core/Icon'
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import '../assets/css/nav.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
	padding: '65px 0 0 0',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  interface drawerProps{
	icon: String,
	to: String,
	text: String
  }

  const DrawerIcon = (props: drawerProps) => {
	return (
		<ListItem button key={'props.text'} component={Link} to={`${props.to}`}>
			<ListItemIcon><Icon>{props.icon}</Icon></ListItemIcon>
			<ListItemText primary={props.text}/>
		</ListItem>
	)
  }

  const sideList = () => (
    <div className="drawer-list"
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
    </div>
  );
  return (
	<div className="action-icon-responsive"> 
		<button id="menu-icon" className="action-icon" onClick={toggleDrawer(!state)}>
		<a className="nav-icon ">
			<i className="material-icons">menu</i>
		</a>
		</button>
		<SwipeableDrawer
			open={state}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
		> {sideList()}
		</SwipeableDrawer>
	</div>
  );
}