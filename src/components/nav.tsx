/* React */
import React, {Component} from 'react'

/* React Util */
import { NavLink } from "react-router-dom"
import { ButtonBase } from "@material-ui/core"

/* React Component */
import IconNav from '../components/iconNav'

class Nav extends Component<{}, {}>   {
    render(){
        return(
            <>
                <nav id="navigator-wrapper">
                    <div id="navigator-left">
                        <ButtonBase style={{borderRadius: "3px", color:"rgba(0,0,0,.5)"}}>
                            <NavLink 
                                activeClassName="nav-active"
                                to="/" 
                                id="navigator-title" 
                                className="icon-link" 
                                style={{fontWeight: "bolder"}}
                            >
                                <p>
                                    Programming.in.th
                                </p>
                            </NavLink>
                        </ButtonBase>
                        <IconNav icon="functions" to="/task" />
                        <IconNav icon="forum" to="/forum" />
                    </div>
                    <div id="navigator-right">
                        <NavLink 
                            activeClassName="nav-active"
                            to="/account" 
                            id="account-tab"
                        >
                            <ButtonBase style={{borderRadius: "3px", color:"rgba(0,0,0,.5)"}}>
                                <div id="account">
                                    <img id="account-image" src="/assets/img/default-user.png" />
                                    <p id="account-name">
                                        Guest
                                    </p>
                                </div>
                            </ButtonBase>
                            <div id="navigator-right-function">
                                <IconNav icon="timeline" to="/me" />
                            </div>
                        </NavLink>
                     </div>
                </nav>
            </>
        )
    }
}

export default Nav