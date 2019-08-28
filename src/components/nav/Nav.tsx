import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Drawer, Button, Menu } from 'antd'

const responsive = `(max-width: 767px)`

const Navigator = styled.nav`
  padding: 0 20px;
  overflow: auto;
  background-color: white;
`

const Logo = styled.div`
  float: left;
  & a {
    display: inline-block;
    font-size: 17px;
    padding-top: 10px;
    padding-bottom: 8px;
    @media ${responsive} {
      padding-top: 11px;
    }
  }
`
const LeftMenu = styled.div`
  float: left;
  @media ${responsive} {
    display: none;
  }
`
const RightMenu = styled.div`
  float: right;
  @media ${responsive} {
    display: none;
  }
`

const BarMenu = styled(Button)`
  float: right;
  margin: 8px;
  display: none !important;
  @media ${responsive} {
    display: inline-block !important;
  }
`

const _Nav = (props: any) => {
  const [visible, setVisibility] = useState(false)
  return (
    <Navigator>
      <Logo>
        <Link to="/">programming.in.th</Link>
      </Logo>
      <LeftMenu>
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
      </LeftMenu>
      <RightMenu>
        <Menu mode="horizontal" selectedKeys={[props.location.pathname]}>
          <Menu.Item key="/login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </RightMenu>
      <BarMenu icon="menu" onClick={() => setVisibility(true)} />
      <Drawer
        title="Menu"
        placement="top"
        onClose={() => setVisibility(false)}
        visible={visible}
      ></Drawer>
    </Navigator>
  )
}

export const Nav = withRouter(_Nav)
