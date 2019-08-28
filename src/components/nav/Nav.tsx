import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { LeftMenu } from './LeftMenu'
import { RightMenu } from './RightMenu'
import { Drawer, Button, Menu } from 'antd'
import './app.css'

const _Nav = (props: any) => {
  const [visible, setVisibility] = useState(false)

  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/">programming</Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <Menu mode="horizontal" selectedKeys={[props.location.pathname]}>
            <Menu.Item key="/tasks">
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
            <Menu.Item key="/learn">
              <Link to="/learn">Learn</Link>
            </Menu.Item>
            <Menu.Item key="/forum">
              <Link to="/forum">Forum</Link>
            </Menu.Item>
            <Menu.Item key="/exam">
              <Link to="/exam">Exam</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="rightMenu">
          <Menu mode="horizontal" selectedKeys={[props.location.pathname]}>
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="/register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Button
          className="barsMenu"
          type="primary"
          onClick={() => setVisibility(true)}
        >
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={() => setVisibility(false)}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  )
}

export const Nav = withRouter(_Nav)
