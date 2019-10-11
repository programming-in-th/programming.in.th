import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'

import { withRouter, match } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { Drawer, Button, Menu, Avatar, Icon } from 'antd'

import firebase from 'firebase/app'
import 'firebase/auth'
import H from 'history'

const LogoutWrapper = styled.div`
  text-align: center;
  margin: 5px;
  float: right;
`

const responsive = `(max-width: 1020px)`

interface INavigatorProps {
  location: H.Location
  match: match
  user?: firebase.User
}

interface IItem {
  className?: any
  mode?: 'vertical' | 'horizontal'
  location: string
  hideDrawer?: () => void
  user?: firebase.User
}

interface INavigatorStates {
  visible: boolean
  top: number
}

const { Header } = Layout

const enableTransparency = (location: string, top: number): string => {
  if (location === '/') {
    return `rgba(255, 255, 255,${Math.min(top / 120, 1)})`
  }

  return 'white'
}

const NavHeader = styled(Header)<{ top: number; location: string }>`
  background: ${props => enableTransparency(props.location, props.top)};
  position: fixed;
  z-index: 100;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

class Navigator extends React.Component<INavigatorProps, INavigatorStates> {
  state: INavigatorStates = {
    visible: false,
    top: 0
  }

  checkScrollPosition = () => {
    const { pageYOffset } = window
    this.setState({ top: pageYOffset })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkScrollPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollPosition)
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
      <NavHeader top={this.state.top} location={locationReal}>
        <React.Fragment>
          <Logo>
            <Link to="/">programming.in.th</Link>
          </Logo>
          <LeftMenu mode="horizontal" location={location} />
          <RightMenu mode="horizontal" location={location} user={user} />
          <BarMenu
            icon="menu"
            onClick={this.showDrawer}
            size="large"
            top={this.state.top}
            location={locationReal}
          />
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
      </NavHeader>
    )
  }
}

const Main = (props: IItem) => {
  return (
    <div className={props.className}>
      <Menu
        mode={props.mode}
        style={{
          lineHeight: '64px',
          background: 'transparent',
          border: 'none'
        }}
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
          style={{
            lineHeight: '64px',
            background: 'transparent',
            border: 'none'
          }}
          selectedKeys={[props.location]}
        >
          <Menu.SubMenu
            key="user"
            title={
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
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <LogoutWrapper>
              <Button type="danger" onClick={() => firebase.auth().signOut()}>
                Logout
              </Button>
            </LogoutWrapper>
          </Menu.SubMenu>
        </Menu>
      ) : (
        <Menu
          mode={props.mode}
          style={{
            lineHeight: '64px',
            background: 'transparent',
            border: 'none'
          }}
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
  background: transparent;
  float: left;
  border-right: none;
  @media ${responsive} {
    display: none;
  }
`

const RightMenu = styled(Login)`
  background: transparent;
  float: right;
  @media ${responsive} {
    display: none;
  }
`

const BarMenu = styled(Button)<{ top: number; location: string }>`
  float: right;
  margin-top: 12px;
  display: none !important;
  background: ${props => enableTransparency(props.location, props.top)};
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
