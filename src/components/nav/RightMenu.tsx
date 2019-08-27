import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'

class Main extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="login">
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
        <Menu.Item key="register">
          <NavLink to="/register">Register</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}

export const RightMenu = Main
