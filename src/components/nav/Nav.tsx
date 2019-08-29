import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Drawer, Button, Menu } from 'antd'

interface item {
  className?: any
  mode?:
    | 'vertical'
    | 'vertical-left'
    | 'vertical-right'
    | 'horizontal'
    | 'inline'
    | undefined
  pathname: any
  onClick: any
}

const Main = (props: item) => {
  return (
    <div className={props.className}>
      <Menu mode={props.mode} selectedKeys={[props.pathname]}>
        <Menu.Item key="/tasks">
          <Link to="/tasks" onClick={props.onClick}>
            Tasks
          </Link>
        </Menu.Item>
        <Menu.Item key="/learn">
          <Link to="/learn" onClick={props.onClick}>
            Learn
          </Link>
        </Menu.Item>
        <Menu.Item key="/forum">
          <Link to="/forum" onClick={props.onClick}>
            Forum
          </Link>
        </Menu.Item>
        <Menu.Item key="/exam">
          <Link to="/exam" onClick={props.onClick}>
            Exam
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

const Login = (props: item) => {
  return (
    <div className={props.className}>
      <Menu mode={props.mode} selectedKeys={[props.pathname]}>
        <Menu.Item key="/login">
          <Link to="/login" onClick={props.onClick}>
            Login
          </Link>
        </Menu.Item>
        <Menu.Item key="/register">
          <Link to="/register" onClick={props.onClick}>
            Register
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

const responsive = `(max-width: 767px)`

const Navigator = styled.nav`
  padding: 0 20px;
  overflow: auto;
  background-color: #fff;
  position: fixed;
  z-index: 200000;
  width: 100%;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.075);
`

const Logo = styled.div`
  float: left;
  & a {
    display: inline-block;
    font-size: 17px;
    padding-top: 9px;
    padding-bottom: 8px;
    margin-right: 15px;
    @media ${responsive} {
      padding-top: 15px;
    }
  }
`
const LeftMenu = styled(Main)`
  float: left;
  border-right: none;
  @media ${responsive} {
    display: none;
  }
`
const RightMenu = styled(Login)`
  float: right;
  @media ${responsive} {
    display: none;
  }
`

const BarMenu = styled(Button)`
  float: right;
  margin: 11px;
  display: none !important;
  @media ${responsive} {
    display: inline-block !important;
  }
`

const MainDrawer = styled(Main)`
  & ul {
    border-right: none;
  }
`

const LoginDrawer = styled(Login)`
  & ul {
    border-right: none;
  }
`

const _Nav = (props: any) => {
  const [visible, setVisibility] = useState(false)
  return (
    <Navigator>
      <Logo>
        <Link to="/" onClick={() => setVisibility(false)}>
          programming.in.th
        </Link>
      </Logo>
      <LeftMenu
        mode="horizontal"
        pathname={props.location.pathname}
        onClick={() => setVisibility(false)}
      />
      <RightMenu
        mode="horizontal"
        pathname={props.location.pathname}
        onClick={() => setVisibility(false)}
      />
      <BarMenu icon="menu" onClick={() => setVisibility(!visible)} />
      <Drawer
        title="Menu"
        placement="top"
        onClose={() => setVisibility(false)}
        visible={visible}
        height="360px"
        bodyStyle={{ padding: '10px' }}
      >
        <MainDrawer
          mode="vertical"
          pathname={props.location.pathname}
          onClick={() => setVisibility(false)}
        />
        <LoginDrawer
          mode="vertical"
          pathname={props.location.pathname}
          onClick={() => setVisibility(false)}
        />
      </Drawer>
    </Navigator>
  )
}

export const Nav = withRouter(_Nav)
