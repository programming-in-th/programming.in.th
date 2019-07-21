import React, {Component, useState} from "react"
import '../assets/css/nav.css'
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import FunctionsIcon from "@material-ui/icons/Functions";
import SchoolIcon from "@material-ui/icons/School";
import UsersIcon from "@material-ui/icons/AccountBox";
import ForumIcon from "@material-ui/icons/Forum";
import ExamsIcon from "@material-ui/icons/FeaturedPlayList";

const LeftDrawer = () => {
	// TODO: Get these paths from router

	return (
      <aside id="left-menu">
        {/* <div id="left-menu-navigator">
          <i className="material-icons">settings</i>
        </div> */}
        <div id="left-drawer">
			<div>
			<List>
				<ListItem button key="problemset">
					<ListItemText>Problemset</ListItemText>
					<ListItemIcon><FunctionsIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="learn">
					<ListItemText>Learn</ListItemText>
					<ListItemIcon><SchoolIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="users">
					<ListItemText>Users</ListItemText>
					<ListItemIcon><UsersIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="forum">
					<ListItemText>Forum</ListItemText>
					<ListItemIcon><ForumIcon /></ListItemIcon>
				</ListItem>
				<ListItem button key="exams">
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