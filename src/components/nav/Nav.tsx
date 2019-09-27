import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { Drawer, Button, Menu, Avatar, Icon } from 'antd'

import firebase from 'firebase/app'
import 'firebase/auth'
import H from 'history'

const responsive = `(max-width: 1020px)`

interface INavigatorProps {
  location: H.Location
  user?: firebase.User
}

interface IItem {
  className?: any
  mode?: 'vertical' | 'horizontal'
  location: string
  hideDrawer?: () => void
  user?: firebase.User
}

class Navigator extends React.Component<INavigatorProps> {
  state = {
    visible: false
  }

  showDrawer = () => {
    this.setState({ visible: true })
  }

  hideDrawer = () => {
    this.setState({ visible: false })
  }

  render() {
    const locationReal = this.props.location.pathname as string
    const location = locationReal.split('/')[1]
    const { user } = this.props

    return (
      <React.Fragment>
        <Logo>
          <Link to="/">programming.in.th</Link>
        </Logo>
        <LeftMenu mode="horizontal" location={location} />
        <RightMenu mode="horizontal" location={location} user={user} />
        <BarMenu icon="menu" onClick={this.showDrawer} size="large" />
        <Drawer
          title="Menu"
          placement="top"
          onClose={this.hideDrawer}
          visible={this.state.visible}
          height="auto"
          bodyStyle={{ padding: '10px' }}
        >
          <MainDrawer
            mode="vertical"
            location={location}
            hideDrawer={this.hideDrawer}
          />
          <LoginDrawer
            mode="vertical"
            location={location}
            hideDrawer={this.hideDrawer}
            user={user}
          />
        </Drawer>
      </React.Fragment>
    )
  }
}

const Main = (props: IItem) => {
  return (
    <div className={props.className}>
      <Menu
        mode={props.mode}
        style={{ lineHeight: '64px' }}
        selectedKeys={[props.location]}
      >
        <Menu.Item key="tasks">
          <Link to="/tasks" onClick={props.hideDrawer}>
            <Icon type="appstore" />
            Tasks
          </Link>
        </Menu.Item>
        <Menu.Item key="submissions">
          <Link to="/submissions" onClick={props.hideDrawer}>
            <Icon type="container" />
            Submissions
          </Link>
        </Menu.Item>
        <Menu.Item key="learn">
          <Link to="/learn" onClick={props.hideDrawer}>
            <Icon type="read" />
            Learn
          </Link>
        </Menu.Item>
        <Menu.Item key="forum">
          <Link to="/forum" onClick={props.hideDrawer}>
            <Icon type="project" />
            Forum
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

const Login = (props: IItem) => {
  return (
    <div className={props.className}>
      {props.user ? (
        <Menu
          mode={props.mode}
          style={{ lineHeight: '64px' }}
          selectedKeys={[props.location]}
        >
          <Menu.Item key="user">
            <UserWrapper>
              <p style={{ marginRight: '15px' }}>
                {props.user.displayName === ''
                  ? 'User'
                  : props.user.displayName}
              </p>
              <Avatar
                src={
                  props.user.photoURL === ''
                    ? '/assets/img/default-user.png'
                    : `${props.user.photoURL}`
                }
              />
            </UserWrapper>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          mode={props.mode}
          style={{ lineHeight: '64px' }}
          selectedKeys={[props.location]}
        >
          <Menu.Item key="login">
            <Link to="/login" onClick={props.hideDrawer}>
              <Icon type="login" />
              Login
            </Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register" onClick={props.hideDrawer}>
              <Icon type="up-square" />
              Register
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

const Logo = styled.div`
  float: left;
  & a {
    display: inline-block;
    font-size: 17px;
    margin-right: 15px;
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
  margin-top: 12px;
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

const UserWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media ${responsive} {
    position: absolute;
    right: 20px;
  }
`

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const Nav = compose(
  withRouter,
  connect(mapStateToProps)
)(Navigator) as any
