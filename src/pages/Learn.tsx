import React from 'react'

import { Link } from 'react-router-dom'
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
  position: fixed;
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
  position: fixed;
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
  position: fixed;
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
  position: fixed;
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

class Learn extends React.Component<any> {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3']
  state = {
    visible: false,
    handle: false,
    openKeys: ['']
  }
  onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(
      (key: string) => this.state.openKeys.indexOf(key) === -1
    ) as any
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }
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
  componentWillReceiveProps() {
    if (this.state.visible) this.onClose()
  }
  render() {
    const param = this.props.match.params.page
    const location = this.props.location.pathname
    const SideMenu = () => {
      return (
        <Menu
          theme="light"
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          selectedKeys={[location]}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          <Menu.Item key="/learn">
            <Link to="/learn">
              <Icon type="home" />
              Menu
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                subnav 1
              </span>
            }
          >
            <Menu.Item key="/learn/1">
              <Link to="/learn/1"> option1</Link>
            </Menu.Item>
            <Menu.Item key="/learn/2">
              <Link to="/learn/2"> option2</Link>
            </Menu.Item>
            <Menu.Item key="/learn/3">
              <Link to="/learn/3"> option3</Link>
            </Menu.Item>
            <Menu.Item key="/learn/4">
              <Link to="/learn/4"> option4</Link>
            </Menu.Item>
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
            <Menu.Item key="/learn/5">
              <Link to="/learn/5"> option5</Link>
            </Menu.Item>
            <Menu.Item key="/learn/6">
              <Link to="/learn/6"> option6</Link>
            </Menu.Item>
            <Menu.Item key="/learn/7">
              <Link to="/learn/7"> option7</Link>
            </Menu.Item>
            <Menu.Item key="/learn/8">
              <Link to="/learn/8"> option8</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      )
    }
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
              {param ? (
                <LearnContent uid={param} />
              ) : (
                <div>
                  Main Page The standard Lorem Ipsum passage, used since the
                  1500s "Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum." Section 1.10.32
                  of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?" 1914 translation by H. Rackham "But
                  I must explain to you how all this mistaken idea of denouncing
                  pleasure and praising pain was born and I will give you a
                  complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                  circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses to enjoy a pleasure that has no
                  annoying consequences, or one who avoids a pain that produces
                  no resultant pleasure?"
                </div>
              )}
            </MainContent>
          </ContentLayout>
        </MainLayout>
      </React.Fragment>
    )
  }
}

export const LearnPage = Learn
