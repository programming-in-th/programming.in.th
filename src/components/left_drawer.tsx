import React, {Component, useState} from "react"
import '../assets/css/nav.css'
import {Link} from "react-router-dom"
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

interface LeftDrawerProps {
	toggle: Function
}

interface drawerProps {
	key : String,
	to : String,
	icon : String,
	onClick? : any,
	text : String, 
}




const LeftDrawer = (prop: LeftDrawerProps) => {
	// TODO: Get these paths from router
	const DrawerIcon = (props: drawerProps )=> {
		return(
			<ListItem button key={'props.key'} component={Link} to={`${props.to}`} onClick={() => prop.toggle()}>
				<a className="drawer-icon">
				<i className="material-icons">{props.icon}</i>
				</a>
				<ListItemText>{props.text}</ListItemText>
			</ListItem>
		)
	}
	return (
      <aside id="left-menu">
        <div id="left-drawer">
			<div>
			<List>
				<DrawerIcon key="home" to="/" text="Home" icon="home" />
				<DrawerIcon key="tasks" to="/tasks" text="Tasks" icon="functions" />
				<DrawerIcon key="learn" to="/learn" text="Learn" icon="school" />
				<DrawerIcon key="users" to="/users" text="Users" icon="account_box" />
				<DrawerIcon key="forum" to="/forum" text="Forum" icon="forum" />
				<DrawerIcon key="exams" to="/exams" text="Exams" icon="featured_playlist" />
			</List>
			</div>
        </div>
      </aside>
	  
	);
}

export default LeftDrawer;