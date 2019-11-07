import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout, Drawer, Button, Menu, Avatar, Icon, Divider } from 'antd'
import styled from 'styled-components'

import { media } from '../design/Responsive'

import firebase from 'firebase/app'
import 'firebase/auth'
import { useUser } from './UserContext'
import { Fonts } from '../design'

const { Header } = Layout

const NavHeader = styled(Header)<{
  top: number
  location: string
  hidden: boolean
}>`
  background: ${props => enableTransparency(props.location, props.top)};
  transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: fixed;
  z-index: 100;
  width: 100%;
  box-shadow: ${props => enableBoxShadow(props.location, props.top)};
  display: ${props => (props.hidden ? 'none' : 'block')};
  padding: 0 100px;

  ${media('TABLET')} {
    padding-left: 25px;
    padding-right: 25px;
  }
`

interface IItem {
  className?: string
  location: string
  hideDrawer?: () => void
  isAdmin?: boolean
  user?: firebase.User
  mode?: 'vertical' | 'horizontal'
}

interface INavigatorProps {
  hidden: boolean
}

export const Navigator: React.FunctionComponent<INavigatorProps> = (
  props: INavigatorProps
) => {
  const Router = useRouter()
  const locationReal = Router.pathname
  const location = locationReal.split('/')[1]

  const { user, isAdmin } = useUser()

  const [visible, setVisibility] = useState<boolean>(false)
  const [top, setTop] = useState<number>(0)

  useEffect(() => {
    const checkScrollPosition = () => {
      const { pageYOffset } = window
      setTop(pageYOffset)
    }

    window.addEventListener('scroll', checkScrollPosition)

    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  const showDrawer = () => {
    setVisibility(true)
  }

  const hideDrawer = () => {
    setVisibility(false)
  }

  return (
    <NavHeader top={top} location={locationReal} hidden={props.hidden}>
      <React.Fragment>
        <Logo>
          <Link href="/">
            <a>PROGRAMMING.IN.TH</a>
          </Link>
        </Logo>
        <LeftMenu mode="horizontal" location={location} isAdmin={isAdmin} />
        <RightMenu mode="horizontal" location={location} user={user} />
        <BarMenu
          icon="menu"
          onClick={showDrawer}
          size="large"
          top={top}
          location={locationReal}
        />
        <Drawer
          title="Menu"
          placement="top"
          onClose={hideDrawer}
          visible={visible}
          height="auto"
          bodyStyle={{ padding: '10px' }}
        >
          <MainDrawer
            mode="vertical"
            location={location}
            hideDrawer={hideDrawer}
            isAdmin={isAdmin}
          />
          <LoginDrawer
            mode="vertical"
            location={location}
            hideDrawer={hideDrawer}
            user={user}
          />
        </Drawer>
      </React.Fragment>
    </NavHeader>
  )
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
          <Link href="/tasks">
            <a>
              <Icon type="appstore" />
              Tasks
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="submissions">
          <Link href="/submissions">
            <a>
              <Icon type="container" />
              Submissions
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="learn">
          <Link href="/learn">
            <a>
              <Icon type="read" />
              Learn
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="forum">
          <Link href="/forum">
            <a>
              <Icon type="project" />
              Forum
            </a>
          </Link>
        </Menu.Item>
        {props.isAdmin ? (
          <Menu.Item key="admin">
            <Link href="/admin">
              <a>
                <Icon type="api" />
                Admin
              </a>
            </Link>
          </Menu.Item>
        ) : null}
      </Menu>
    </div>
  )
}

const Login = (props: IItem) => {
  if (!props.user) {
    return null
  }

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
                <Avatar
                  src={
                    props.user.photoURL === ''
                      ? '/assets/img/default-user.png'
                      : `${props.user.photoURL}`
                  }
                />
                <p style={{ marginLeft: '15px' }}>
                  {props.user ? props.user.displayName : 'User'}
                </p>
              </UserWrapper>
            }
          >
            <Menu.ItemGroup>
              <Menu.Item key="profile">
                <Link href="/profile">
                  <a>
                    <Icon type="user" />
                    Profile
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="options">
                <Link href="/setting/basic">
                  <a>
                    <Icon type="setting" />
                    Setting
                  </a>
                </Link>
              </Menu.Item>
              <Divider></Divider>
              <Menu.Item key="logout" onClick={() => firebase.auth().signOut()}>
                <Icon type="logout" />
                Logout
              </Menu.Item>
            </Menu.ItemGroup>
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
            <Link href="/login">
              <a>
                <Icon type="login" />
                Login
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link href="/register">
              <a>
                <Icon type="up-square" />
                Register
              </a>
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
    margin-top: 1px;
    font-family: ${Fonts.display};
    font-weight: 800;
    display: inline-block;
    font-size: 17px;
    margin-right: 15px;
    color: #1890ff;
  }
`

const LeftMenu = styled(Main)`
  background: transparent;
  float: left;
  border-right: none;

  ${media('IPAD_PRO')} {
    display: none;
  }
`

const RightMenu = styled(Login)`
  background: transparent;
  float: right;

  ${media('IPAD_PRO')} {
    display: none;
  }
`

const BarMenu = styled(Button)<{ top: number; location: string }>`
  float: right;
  margin-top: 12px;
  display: none !important;
  background: ${props => enableTransparency(props.location, props.top)};

  ${media('IPAD_PRO')} {
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

  ${media('IPAD_PRO')} {
    position: absolute;
    right: 20px;
  }
`

const enableTransparency = (location: string, top: number): string => {
  if (location === '/') {
    return `rgba(255, 255, 255,${top > 60 ? 1 : 0})`
  }

  return 'white'
}

const enableBoxShadow = (location: string, top: number): string => {
  if (location === '/') {
    return `0 2px 8px rgba(0,0,0,${top > 120 ? 0.15 : 0})`
  }

  return '0 2px 8px rgba(0,0,0,.15)'
}
