import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { Drawer, Button, Menu, Avatar } from 'antd'

import firebase from 'firebase/app'
import 'firebase/auth'

class Navigator extends React.Component<
  RouteComponentProps<any> & { user: firebase.User }
> {
  firebaseLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload()
      })
  }
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
    const responsive = `(max-width: 822px)`
    interface item {
      className?: any
      mode?: 'vertical' | 'horizontal'
    }
    const LocationReal = this.props.location.pathname as string
    const Location = LocationReal.split('/')[1]
    const { user } = this.props
    const Main = (props: item) => {
      return (
        <div className={props.className}>
          <Menu
            mode={props.mode}
            style={{ lineHeight: '64px' }}
            selectedKeys={[Location]}
          >
            <Menu.Item key="tasks">
              <Link to="/tasks" onClick={this.hideDrawer}>
                Tasks
              </Link>
            </Menu.Item>
            <Menu.Item key="learn">
              <Link to="/learn" onClick={this.hideDrawer}>
                Learn
              </Link>
            </Menu.Item>
            <Menu.Item key="forum">
              <Link to="/forum" onClick={this.hideDrawer}>
                Forum
              </Link>
            </Menu.Item>
            <Menu.Item key="exam">
              <Link to="/exam" onClick={this.hideDrawer}>
                Exam
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      )
    }
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
    const Login = (props: item) => {
      return (
        <div className={props.className}>
          {user ? (
            <Menu
              mode={props.mode}
              style={{ lineHeight: '64px' }}
              selectedKeys={[Location]}
            >
              <Menu.Item key="user">
                <UserWrapper onClick={this.firebaseLogout}>
                  <p style={{ marginRight: '15px' }}>
                    {user.displayName === '' ? 'User' : user.displayName}
                  </p>
                  <Avatar
                    src={
                      user.photoURL === ''
                        ? '/assets/img/default-user.png'
                        : `${user.photoURL}`
                    }
                  />
                </UserWrapper>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              mode={props.mode}
              style={{ lineHeight: '64px' }}
              selectedKeys={[Location]}
            >
              <Menu.Item key="login">
                <Link to="/login" onClick={this.hideDrawer}>
                  Login
                </Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link to="/register" onClick={this.hideDrawer}>
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
    return (
      <React.Fragment>
        <Logo>
          <Link to="/">programming.in.th</Link>
        </Logo>
        <LeftMenu mode="horizontal" />
        <RightMenu mode="horizontal" />
        <BarMenu icon="menu" onClick={this.showDrawer} size="large" />
        <Drawer
          title="Menu"
          placement="top"
          onClose={this.hideDrawer}
          visible={this.state.visible}
          height="auto"
          bodyStyle={{ padding: '10px' }}
        >
          <MainDrawer mode="vertical" />
          <LoginDrawer mode="vertical" />
        </Drawer>
      </React.Fragment>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const Nav = compose(
  withRouter,
  connect(mapStateToProps)
)(Navigator) as any
