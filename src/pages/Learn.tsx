import React from 'react'
import { Menu, Icon, Col, Row, Layout, Drawer } from 'antd'
import { NavLink } from 'react-router-dom'

import { LearnContent } from '../components/learn/LearnContent'

import * as actionCreators from '../redux/actions/index'
import { connect } from 'react-redux'
import { INode } from '../redux/types/learn'
import { CustomSpin } from '../components/Spin'
import { responsive, DesktopOnly } from '../components/Responsive'
import styled from 'styled-components'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const DrawerMenu = styled.div`
  position: fixed;
  top: 144px;
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

const Blank = styled.div`
  margin-right: 325px !important;
`

interface ILearnState {
  visible: boolean
}

class Learn extends React.Component<any, ILearnState> {
  state = {
    visible: false
  }
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.article_id)
  }

  onItemClick = (node: any) => {
    this.props.onChangeArticle(this.props.idMap.get(node.article_id))
    this.onClose()
  }

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
    const article_id = this.props.match.params.article_id

    return this.props.menuStatus !== 'SUCCESS' ? (
      <CustomSpin />
    ) : (
      <Layout>
        <DrawerMenu onClick={this.showDrawer}>
          <Icon type="menu" />
        </DrawerMenu>
        <Drawer
          placement="left"
          width={290}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ marginTop: '20px', padding: 0 }}
        >
          <SideMenu
            nodes={nodes}
            currentPath={currentPath}
            onClose={this.onClose}
            onItemClick={this.onItemClick}
          />
        </Drawer>
        <DesktopOnly>
          <Sider
            width={325}
            style={{
              backgroundColor: 'white',
              position: 'fixed',
              height: '100vh'
            }}
          >
            <SideMenu
              nodes={nodes}
              currentPath={currentPath}
              onClose={this.onClose}
              onItemClick={this.onItemClick}
            />
          </Sider>
          <Blank />
        </DesktopOnly>
        <Content>
          <Row>
            <Col span={18} offset={3}>
              {article_id ? (
                <LearnContent
                  article_id={article_id}
                  currentContentStatus={this.props.currentContentStatus}
                  currentContent={this.props.currentContent}
                />
              ) : (
                <div>
                  <br />
                  <br />
                  Welcome to Programming.in.th Tutorials, a comprehensive
                  compilation of all the resources you need to succeed in
                  learning algorithms, data structures and competitive
                  programming!
                </div>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

interface ISiderProps {
  currentPath: string
  nodes: any
  onClose: () => void
  onItemClick: (node: any) => void
}

const SideMenu = (props: ISiderProps) => {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[props.currentPath]}
      style={{ borderRight: 'none' }}
    >
      <Menu.Item key={'/learn'} onClick={props.onClose}>
        <NavLink to={'/learn'}>
          <Icon type="home" theme="filled" />
          Welcome!
        </NavLink>
      </Menu.Item>
      {props.nodes.map((node: INode) => {
        return node.type === 'section' ? (
          <SubMenu key={node.name} title={node.name}>
            {node.articles!.map((sub_node: INode) => {
              return (
                <Menu.Item
                  key={'/learn/' + sub_node.article_id}
                  onClick={() => props.onItemClick(sub_node)}
                >
                  <NavLink to={'/learn/' + sub_node.article_id}>
                    {sub_node.name}
                  </NavLink>
                </Menu.Item>
              )
            })}
          </SubMenu>
        ) : (
          <Menu.Item
            key={'/learn/' + node.article_id}
            onClick={() => props.onItemClick(node)}
          >
            <NavLink to={'/learn/' + node.article_id}>{node.name}</NavLink>
          </Menu.Item>
        )
      })}
    </Menu>
  )
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
