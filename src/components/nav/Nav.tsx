/* React */
import React from 'react'

/* React Component */
import { NavLink } from 'react-router-dom'
import LeftDrawer from './LeftDrawer'
import { AccountRender } from './Account'
import '../../assets/css/nav.css'

/* Data model */
import 'firebase/auth'

interface NavProps {
  icon: String
  to: String
  exact?: Boolean
}

const LinkIcon = (props: NavProps) => {
  return (
    props.exact ?
      <NavLink to={`${props.to}`} exact activeClassName="nav-active" className="nav-icon link-icon-responsive">
        <i className="material-icons">{props.icon}</i>
      </NavLink>
    :
      <NavLink to={`${props.to}`} activeClassName="nav-active" className="nav-icon link-icon-responsive">
        <i className="material-icons">{props.icon}</i>
      </NavLink>
  )
}

export const Nav = () => {
  return (
    <React.Fragment>
      <nav id="main-nav">
        <div>
          <LeftDrawer />
          <LinkIcon icon="home" to="/" exact={true}/>
          <LinkIcon icon="functions" to="/tasks" />
          <LinkIcon icon="school" to="/learn" />
          <LinkIcon icon="forum" to="/forum" />
          <LinkIcon icon="featured_play_list" to="/exam" />
        </div>
        <div style={{ display: 'inline-flex', flexDirection: 'row-reverse' }}>
          <AccountRender />
        </div>
      </nav>
    </React.Fragment>
  )
}
