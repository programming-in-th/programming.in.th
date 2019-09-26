import React from 'react'
import { Layout, Menu, Icon, Drawer } from 'antd'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { LearnContent } from '../components/learn/LearnContent'

import * as actionCreators from '../redux/actions/index'
import { connect } from 'react-redux'
import { INode } from '../redux/types/learn'
import { CustomSpin } from '../components/Spin'

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

const DrawerMenu = styled.div`
  position: fixed;
  top: 72px;
  width: 41px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
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
  state = { visible: false }
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.article_id)
  }

  componentDidUpdate() {}

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
    const currentPath = this.props.match.url
    const nodes = this.props.menu
    const SideMenu = (props: any) => {
      return (
        <div className={props.className}>
          <Menu
            theme="light"
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[currentPath]}
          >
            <Menu.Item key={'/learn'}>
              <NavLink to={'/learn'} onClick={this.onClose}>
                <Icon type="home" theme="filled" />
                Welcome!
              </NavLink>
            </Menu.Item>
            {nodes.map((node: INode) => {
              return node.type === 'section' ? (
                <SubMenu key={node.name} title={node.name}>
                  {node.articles!.map((sub_node: INode) => {
                    return (
                      <Menu.Item
                        key={'/learn/' + sub_node.article_id}
                        onClick={() =>
                          this.props.onChangeArticle(
                            this.props.idMap.get(sub_node.article_id)
                          )
                        }
                      >
                        <NavLink
                          to={'/learn/' + sub_node.article_id}
                          onClick={this.onClose}
                        >
                          {sub_node.name}
                        </NavLink>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              ) : (
                <Menu.Item
                  key={'/learn/' + node.article_id}
                  onClick={() =>
                    this.props.onChangeArticle(
                      this.props.idMap.get(node.article_id)
                    )
                  }
                >
                  <NavLink to={'/learn/' + node.article_id}>
                    {node.name}
                  </NavLink>
                </Menu.Item>
              )
            })}
          </Menu>
        </div>
      )
    }
    const article_id = this.props.match.params.article_id
    return this.props.menuStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      <React.Fragment>
        <DrawerMenu onClick={this.showDrawer}>
          <Icon type="menu" />
        </DrawerMenu>
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
              {article_id ? (
                <LearnContent
                  article_id={article_id}
                  currentContentStatus={this.props.currentContentStatus}
                  currentContent={this.props.currentContent}
                />
              ) : (
                <div>
                  Welcome to Programming.in.th Tutorials, a comprehensive
                  compilation of all the resources you need to succeed in
                  learning algorithms, data structures and competitive
                  programming!
                </div>
              )}
            </MainContent>
          </ContentLayout>
        </MainLayout>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    menu: state.learn.menu,
    menuStatus: state.learn.menuStatus,
    idMap: state.learn.idMap,
    currentContent: state.learn.currentContent,
    currentContentStatus: state.learn.currentContentStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitialLoad: (article_id: string) => {
      dispatch(actionCreators.loadMenu(article_id))
    },
    onChangeArticle: (newArticle: INode) => {
      dispatch(actionCreators.loadContent(newArticle.url!))
    }
  }
}

export const LearnPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Learn)
