import React from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'

import { media } from '../../design/Responsive'

import { NotAuthorized } from '../error/403'

import Link from 'next/link'
import { PageLayout } from '../Layout'
import { useRouter } from 'next/router'
import { useUser } from '../UserContext'

const SettingLayoutWrapper = styled.div`
  margin: 64px;

  ${media('TABLET')} {
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

  ${media('TABLET')} {
    padding: 0;
    flex-direction: column;
  }
`

const LeftMenu = styled.div`
  width: 224px;
  border-right: 1px solid #e8e8e8;

  ${media('TABLET')} {
    width: 100%;
    border: none;
  }
`

const Right = styled.div`
  padding: 0 32px 8px 32px;

  ${media('TABLET')} {
    padding: 40px;
  }
`

export const SettingPageLayout: React.FunctionComponent = props => {
  const { user } = useUser()
  const router = useRouter()
  const path = router.pathname

  if (user === null) {
    return <NotAuthorized></NotAuthorized>
  }

  return (
    <PageLayout>
      <SettingLayoutWrapper>
        <SettingLayout>
          <LeftMenu>
            <Menu mode="inline" selectedKeys={[path]}>
              <Menu.Item key="/setting/basic">
                <Link href="/setting/basic">
                  <a>Basic</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/setting/security">
                <Link href="/setting/security">
                  <a>Security</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/setting/social">
                <Link href="/setting/social">
                  <a>Social</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/setting/submissions">
                <Link href="/setting/submissions">
                  <a>Submissions</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="/setting/others">
                <Link href="/setting/others">
                  <a>Others</a>
                </Link>
              </Menu.Item>
            </Menu>
          </LeftMenu>
          <Right>{props.children}</Right>
        </SettingLayout>
      </SettingLayoutWrapper>
    </PageLayout>
  )
}
