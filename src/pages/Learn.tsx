import React from 'react'

import { Layout, Menu, Icon, Drawer } from 'antd'
import { LearnContent } from '../components/learn/LearnContent'
import styled, { keyframes } from 'styled-components'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const responsive = `(max-width: 822px)`

const MainLayout = styled(Layout)`
  margin: 30px 10px 0 20px;
  @media ${responsive} {
    margin: 30px 0 0 0;
  }
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

const move = keyframes`
  from { margin-left: 0; }
  to { margin-left: 256px; }
`
const rmove = keyframes`
  from { margin-left: 256px; }
  to { margin-left: 0; }
`

const DrawerOpening = styled.div`
  position: absolute;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 10000;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: none;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 0 4px 4px 0;
  -webkit-animation: ${move}0.3s infinite; /* Safari 4.0 - 8.0 */
  animation: ${move} 0.3s infinite;
  @media ${responsive} {
    display: flex;
  }
`
const DrawerClosing = styled.div`
  position: absolute;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 10000;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: none;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 0 4px 4px 0;
  -webkit-animation: ${rmove} 0.3s infinite; /* Safari 4.0 - 8.0 */
  animation: ${rmove} 0.3s infinite;
  @media ${responsive} {
    display: flex;
  }
`
const DrawerOpened = styled.div`
  position: absolute;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 20000;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  display: none;
  margin-left: 256px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 0 4px 4px 0;
  @media ${responsive} {
    display: flex;
  }
`
const DrawerClosed = styled.div`
  position: absolute;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 20000;
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
  state = { visible: false, handle: false }
  showDrawer = () => {
    this.setState({
      visible: true
    })
    setTimeout(() => {
      this.setState({
        handle: true
      })
    }, 300)
  }

  onClose = () => {
    this.setState({
      visible: false
    })
    setTimeout(() => {
      this.setState({
        handle: false
      })
    }, 300)
  }
  render() {
    const param = this.props.match.params.page
    return (
      <React.Fragment>
        {this.state.visible ? (
          this.state.handle ? (
            <DrawerOpened onClick={this.onClose}>
              <Icon type="close" />
            </DrawerOpened>
          ) : (
            <DrawerOpening>
              <Icon type="menu" />
            </DrawerOpening>
          )
        ) : this.state.handle ? (
          <DrawerClosing>
            <Icon type="close" />
          </DrawerClosing>
        ) : (
          <DrawerClosed onClick={this.showDrawer}>
            <Icon type="menu" />
          </DrawerClosed>
        )}

        <Drawer
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ padding: '10px' }}
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
