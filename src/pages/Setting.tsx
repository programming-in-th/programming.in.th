import React from 'react'
import firebase from 'firebase/app'
import { Menu } from 'antd'
import styled from 'styled-components'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { responsive } from '../components/Responsive'

import { NotFound } from './404'
import { BasicSettings } from '../components/settings/Basic'
import { SocialSetting } from '../components/settings/Social'
import { SubmissionSetting } from '../components/settings/Submission'

interface ISettingProps {
  user: firebase.User
  match: any
}

const SettingLayoutWrapper = styled.div`
  margin: 64px;
  @media screen and ${responsive} {
    margin: 8px;
  }
`
const SettingLayout = styled.div`
  display: flex;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: auto;

  @media screen and ${responsive} {
    padding: 0;
    flex-direction: column;
  }
`

const LeftMenu = styled.div`
  width: 224px;
  border-right: 1px solid #e8e8e8;
  @media screen and ${responsive} {
    width: 100%;
    border: none;
  }
`

const Right = styled.div`
  padding: 0 32px 8px 32px;

  @media screen and ${responsive} {
    padding: 40px;
  }
`

const Title = styled.h1`
  margin-bottom: 12px;
  font-size: 24px;
  line-height: 28px;
`

class Setting extends React.Component<ISettingProps> {
  componentDidMount() {
    console.log(this.props.user.providerData)
  }

  render() {
    const currentPath = this.props.match.url

    if (this.props.user === null) {
      return <NotFound />
    }

    return (
      <SettingLayoutWrapper>
        <SettingLayout>
          <LeftMenu>
            <Menu mode="inline" selectedKeys={[currentPath]}>
              <Menu.Item key="/setting/basic">
                <Link to="/setting/basic">Basic</Link>
              </Menu.Item>
              <Menu.Item key="/setting/security">
                <Link to="/setting/security">Security</Link>
              </Menu.Item>
              <Menu.Item key="/setting/social">
                <Link to="/setting/social">Social</Link>
              </Menu.Item>
              <Menu.Item key="/setting/submissions">
                <Link to="/setting/submissions">Submissions</Link>
              </Menu.Item>
              <Menu.Item key="/setting/others">
                <Link to="/setting/others">Others</Link>
              </Menu.Item>
            </Menu>
          </LeftMenu>
          <Right>
            <Route path="/setting/basic">
              <Title>Basic Settings</Title>
              <BasicSettings user={this.props.user}></BasicSettings>
            </Route>
            <Route path="/setting/social">
              <Title>Social Binding</Title>
              <SocialSetting user={this.props.user}></SocialSetting>
            </Route>
            <Route path="/setting/submissions">
              <Title>Submissions Setting</Title>
              <SubmissionSetting></SubmissionSetting>
            </Route>
          </Right>
        </SettingLayout>
      </SettingLayoutWrapper>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    user: state.user.user
  }
}

export const SettingPage = connect(mapStateToProps)(Setting) as any
