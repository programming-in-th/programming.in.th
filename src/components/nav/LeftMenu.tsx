import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'

class Main extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="tasks">
          <NavLink to="/tasks">Tasks</NavLink>
        </Menu.Item>
        <Menu.Item key="learn">
          <NavLink to="/learn">Learn</NavLink>
        </Menu.Item>
        <Menu.Item key="forum">
          <NavLink to="/forum">Forum</NavLink>
        </Menu.Item>
        <Menu.Item key="exam">
          <NavLink to="/exam">Exam</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}
export const LeftMenu = Main
