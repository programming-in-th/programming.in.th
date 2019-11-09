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
  width: 90%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  margin: 20px auto;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
`

const SettingLayout = styled.div`
  display: flex;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow: auto;

  ${media('TABLET')} {
    padding: 0;
    flex-direction: column;
  }
`

const Left = styled.div`
  width: 224px;
  border-right: 1px solid #e8e8e8;
  & ul {
    border-right: none;
  }
  ${media('TABLET')} {
    width: 100%;
    border: none;
  }
`

const Right = styled.div`
  margin-left: 20px;
  width: 100%;
  ${media('TABLET')} {
    margin-left: 0px;
  }
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
            <Menu
              mode="inline"
              selectedKeys={[path]}
              style={{
                lineHeight: '64px',
                background: 'transparent',
                border: 'none'
              }}
            >
              <Menu.Item key="/admin/user">
                <Link href="/admin/user">User</Link>
              </Menu.Item>
              <Menu.Item key="/admin/task">
                <Link href="/admin/task">Task</Link>
              </Menu.Item>
              <Menu.Item key="/admin/addtask">
                <Link href="/admin/addtask">Add Task</Link>
              </Menu.Item>
            </Menu>
          </Left>
          <Right>{props.children}</Right>
        </SettingLayout>
      </SettingLayoutWrapper>
    </PageLayout>
  )
}
