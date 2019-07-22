/* React */
import React from 'react'

/* React Util */
import { NavLink } from "react-router-dom"

/* React Util */
import {
  ButtonBase 
} from "@material-ui/core"

/* Static */
import "../assets/css/nav.css"

interface props {
  to: string,
  icon: string
}

export default (props:props) => {
  return(
    <ButtonBase style={{borderRadius: "3px", color:"rgba(0,0,0,.5)"}}>
      <NavLink activeClassName="nav-active" to={props.to} className="icon-link">
        <p className="material-icons icon-nav">{props.icon}</p>
      </NavLink>
    </ButtonBase>
  )
}