/* React */
import React, {Component, useState} from "react"

/* React Component */
import { Link } from "react-router-dom"
import LeftDrawer from "./left_drawer"
import AccountRender from "./account"
import "../assets/css/nav.css"

/* Data model */
import firebase from "firebase/app"
import "firebase/auth"


interface NavProps {
  icon: String,
  to: String
}

const LinkIcon = (props:NavProps) => {
    return(
      <Link to={`${props.to}`}>
        <a className="nav-icon link-icon-responsive">
          <i className="material-icons">{props.icon}</i>
        </a>
      </Link>
    )
}

export default () => {
    return(
      <>
        <nav id="main-nav">
          <div>
            <LeftDrawer />            
            <LinkIcon icon="home" to="/" />
            <LinkIcon icon="functions" to="/tasks" />
            <LinkIcon icon="school" to="/learn" />
            <LinkIcon icon="forum" to="/forum" />
            <LinkIcon icon="featured_play_list" to="/exam" />
          </div>
          <div style={{display:"inline-flex",flexDirection:"row-reverse"}}>
            <AccountRender />
          </div>
        </nav>
      </>
    )
}