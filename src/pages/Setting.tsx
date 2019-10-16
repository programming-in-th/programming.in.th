import React from 'react'
import firebase from 'firebase/app'
import styled from 'styled-components'
import { responsive } from '../components/Responsive'
import { Menu } from 'antd'

import { connect } from 'react-redux'

import { NotFound } from './404'
import { Link } from 'react-router-dom'

interface ISettingProps {
  user: firebase.User
  match: any
}

const SettingLayout = styled.div`
  margin: 64px;
  display: flex;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: auto;

  @media screen and ${responsive} {
    margin: 8px;
  }
`

const LeftMenu = styled.div`
  width: 224px;
  border-right: 1px solid #e8e8e8;
`

const Right = styled.div`
  padding: 0 32px 8px 32px;
`

const Title = styled.h1`
  margin-bottom: 12px;
  font-size: 32px;
  line-height: 28px;
`

class Setting extends React.Component<ISettingProps> {
  componentDidMount() {
    console.log(this.props.match)
  }
  render() {
    const currentPath = this.props.match.url

    if (this.props.user === null) {
      return <NotFound />
    }

    return (
      <SettingLayout>
        <LeftMenu>
          <Menu mode="inline" selectedKeys={[currentPath]}>
            <Menu.Item key="/setting/basic">
              <Link to="/setting/basic">Basic Settings</Link>
            </Menu.Item>
            <Menu.Item key="/setting/security">
              <Link to="/setting/security">Security Settings</Link>
            </Menu.Item>
            <Menu.Item key="/setting/submissions">
              <Link to="/setting/submissions">Submissions Settings</Link>
            </Menu.Item>
            <Menu.Item key="/setting/others">
              <Link to="/setting/others">Others Settings</Link>
            </Menu.Item>
          </Menu>
        </LeftMenu>
        <Right>
          <Title>Hello</Title>
        </Right>
      </SettingLayout>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const SettingPage = connect(mapStateToProps)(Setting) as any
