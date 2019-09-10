import React from 'react'

import { Layout, Menu, Icon, Drawer } from 'antd'
import { LearnContent } from '../components/learn/LearnContent'
import styled from 'styled-components'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const responsive = `(max-width: 822px)`

const MainLayout = styled(Layout)`
  margin: 30px 10px 0 20px;
`

const ContentLayout = styled(Layout)`
  padding: 0 24px 24px;
`

const MainContent = styled(Content)`
  background: white;
  padding: 24px;
  margin: 0;
  min-height: 280px;
`

const SiderMenu = styled(Sider)`
  width: 200px;
  background: white;
  @media ${responsive} {
    display: none;
  }
`
const DrawerHandle = styled.div`
  position: absolute;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 2;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: none;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 0 4px 4px 0;
  @media ${responsive} {
    display: flex;
  }
`

const SideMenu = () => {
  return (
    <Menu
      theme="light"
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            subnav 1
          </span>
        }
      >
        <Menu.Item key="1">option1</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="laptop" />
            subnav 2
          </span>
        }
      >
        <Menu.Item key="5">option5</Menu.Item>
        <Menu.Item key="6">option6</Menu.Item>
        <Menu.Item key="7">option7</Menu.Item>
        <Menu.Item key="8">option8</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="notification" />
            subnav 3
          </span>
        }
      >
        <Menu.Item key="9">option9</Menu.Item>
        <Menu.Item key="10">option10</Menu.Item>
        <Menu.Item key="11">option11</Menu.Item>
        <Menu.Item key="12">option12</Menu.Item>
      </SubMenu>
    </Menu>
  )
}

class Learn extends React.Component<any> {
  state = { visible: false }
  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const param = this.props.match.params.page
    return (
      <React.Fragment>
        <DrawerHandle onClick={this.showDrawer}>
          <Icon type="menu" />
        </DrawerHandle>
        <Drawer
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <SideMenu />
        </Drawer>
        <MainLayout>
          <SiderMenu>
            <SideMenu />
          </SiderMenu>
          <ContentLayout>
            <MainContent>
              {param ? <LearnContent uid={param} /> : <div>Main Page</div>}
            </MainContent>
          </ContentLayout>
        </MainLayout>
      </React.Fragment>
    )
  }
}

export const LearnPage = Learn
