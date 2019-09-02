import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Drawer, Button, Menu } from 'antd'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import firebase from 'firebase/app'
import 'firebase/auth'

class Navigator extends React.Component<{ user: firebase.User }, any> {
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
    interface item {
      className?: any
      mode?: 'vertical' | 'horizontal'
    }
    const Main = (props: item) => {
      return (
        <div className={props.className}>
          <Menu mode={props.mode} style={{ lineHeight: '64px' }}>
            <Menu.Item key="/tasks">
              <Link to="/tasks" onClick={this.hideDrawer}>
                Tasks
              </Link>
            </Menu.Item>
            <Menu.Item key="/learn">
              <Link to="/learn" onClick={this.hideDrawer}>
                Learn
              </Link>
            </Menu.Item>
            <Menu.Item key="/forum">
              <Link to="/forum" onClick={this.hideDrawer}>
                Forum
              </Link>
            </Menu.Item>
            <Menu.Item key="/exam">
              <Link to="/exam" onClick={this.hideDrawer}>
                Exam
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      )
    }
    const { user } = this.props
    const UserWrapper = styled.div`
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `
    const ImgWrapper = styled.img`
      margin-left: 15px;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      object-fit: fill;
      object-fit: cover;
    `
    const Login = (props: item) => {
      return (
        <div className={props.className}>
          <Menu mode={props.mode} style={{ lineHeight: '64px' }}>
            {user ? (
              <Menu.Item key="user">
                <UserWrapper>
                  <p>{user.displayName === '' ? 'User' : user.displayName}</p>
                  <ImgWrapper
                    alt="avatar"
                    src={
                      user.photoURL === ''
                        ? '/assets/img/default-user.png'
                        : `${user.photoURL}`
                    }
                  />
                </UserWrapper>
              </Menu.Item>
            ) : (
              <React.Fragment>
                <Menu.Item key="/login">
                  <Link to="/login" onClick={this.hideDrawer}>
                    Login
                  </Link>
                </Menu.Item>
                <Menu.Item key="/register">
                  <Link to="/register" onClick={this.hideDrawer}>
                    Register
                  </Link>
                </Menu.Item>
              </React.Fragment>
            )}
          </Menu>
        </div>
      )
    }

    const responsive = `(max-width: 767px)`

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
          height="360px"
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

export const Nav = connect(mapStateToProps)(Navigator) as any
