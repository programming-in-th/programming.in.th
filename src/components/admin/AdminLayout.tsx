import React from 'react'
import { PageLayout } from '../Layout'
import { NotAdmin } from './Already'
import { Menu } from 'antd'
import styled from 'styled-components'
import { media } from '../../design/Responsive'
import Link from 'next/link'
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

const Left = styled.div`
  width: 224px;
  border-right: 1px solid #e8e8e8;

  ${media('TABLET')} {
    width: 100%;
    border: none;
  }
`

const Right = styled.div`
  padding: 5px;
  width: 100%;
`

export const AdminLayout: React.FunctionComponent = props => {
  const { isAdmin } = useUser()
  const router = useRouter()
  const path = router.pathname

  if (!isAdmin)
    return (
      <PageLayout>
        <NotAdmin />
      </PageLayout>
    )

  return (
    <PageLayout>
      <SettingLayoutWrapper>
        <SettingLayout>
          <Left>
            <Menu mode="inline" selectedKeys={[path]}>
              <Menu.Item key="/admin/user">
                <Link href="/admin/user">User</Link>
              </Menu.Item>
              <Menu.Item key="/admin/task">
                <Link href="/admin/task">Task</Link>
              </Menu.Item>
            </Menu>
          </Left>
          <Right>{props.children}</Right>
        </SettingLayout>
      </SettingLayoutWrapper>
    </PageLayout>
  )
}
