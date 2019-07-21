import React, {Component, useState} from "react"
import '../assets/css/nav.css'
import {Link} from "react-router-dom"
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FunctionsIcon from "@material-ui/icons/Functions";
import SchoolIcon from "@material-ui/icons/School";
import UsersIcon from "@material-ui/icons/AccountBox";
import ForumIcon from "@material-ui/icons/Forum";
import ExamsIcon from "@material-ui/icons/FeaturedPlayList";

interface LeftDrawerProps {
	toggle: Function
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
				<ListItem button key="home" component={Link} to="/" onClick = {() => props.toggle()}>
					<ListItemText>Home</ListItemText>
					<ListItemIcon><HomeIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="tasks" component={Link} to="/tasks" onClick= {() => props.toggle()}>
					<ListItemText>Tasks</ListItemText>
					<ListItemIcon><FunctionsIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="learn" component={Link} to="/learn" onClick= {() => props.toggle()}>
					<ListItemText>Learn</ListItemText>
					<ListItemIcon><SchoolIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="users" component={Link} to="/users" onClick= {() => props.toggle()}>
					<ListItemText>Users</ListItemText>
					<ListItemIcon><UsersIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="forum" component={Link} to="/forum" onClick= {() => props.toggle()}>
					<ListItemText>Forum</ListItemText>
					<ListItemIcon><ForumIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="exams" component={Link} to="/exams" onClick= {() => props.toggle()}>
					<ListItemText>Exams</ListItemText>
					<ListItemIcon><ExamsIcon /></ListItemIcon>
				</ListItem>
			</List>
			</div>
        </div>
      </aside>
	);
}

export default LeftDrawer;