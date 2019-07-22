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

const DrawerIcon = (props: drawerProps )=> {
	return(
		<ListItem button key={`${props.key}`} component={Link} to={`${props.to}`} onClick={() => props.onClick()}>
			<a className="drawer-icon">
			  <i className="material-icons">{props.icon}</i>
			</a>
			<ListItemText>{props.text}</ListItemText>
		</ListItem>
	  )
}

const LeftDrawer = (props: LeftDrawerProps) => {
	// TODO: Get these paths from router

	return (
      <aside id="left-menu">
        {/* <div id="left-menu-navigator">
          <i className="material-icons">settings</i>
        </div> */}
        <div id="left-drawer">
			<div>
			<List>
				<DrawerIcon key="home" to="/" text="Home" icon="home" onClick = {() => props.toggle()} />
				<DrawerIcon key="tasks" to="/tasks" text="Tasks" icon="functions" onClick = {() => props.toggle()} />
				<DrawerIcon key="learn" to="/learn" text="Learn" icon="school" onClick = {() => props.toggle()} />
				<DrawerIcon key="users" to="/users" text="Users" icon="account_box" onClick = {() => props.toggle()} />
				<DrawerIcon key="forum" to="/forum" text="Forum" icon="forum" onClick = {() => props.toggle()} />
				<DrawerIcon key="exams" to="/exams" text="Exams" icon="featured_playlist" onClick = {() => props.toggle()} />
			</List>
			</div>
        </div>
      </aside>
	  
	);
}

export default LeftDrawer;