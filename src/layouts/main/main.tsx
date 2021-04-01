import React, { FunctionComponent, useState } from 'react'
import { AuthorizedRouters } from '~/routes'
import { BrowserRouter } from 'react-router-dom'
import { Layout, Menu, Avatar, Button, Dropdown } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, DashboardOutlined, FileDoneOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '~/store/auth'
import './Main.css'
import Logo from '~/assets/logo.svg'
import { NavLink } from 'react-router-dom'
const { Header, Sider, Content } = Layout

export const Main: FunctionComponent = () => {
  const { logout, isAuth } = useAuth()
  const [menuRolled, setMenuRolled] = useState<boolean>(false)

  function UserDropDownMenu() {
    return (
      <Menu>
        <Menu.Item key="1" onClick={logout}>Выйти</Menu.Item>
        <Menu.Item key="2">asd</Menu.Item>
      </Menu>
    )
  }

  const computed = {
    get defaultOpenKeys() {
      const result = []
      const directory = ~['/shipowner'].indexOf(window.location.pathname)
      if (directory) result.push('/directory')
      return result
    },
    get logoClass() {
      return `logo ${menuRolled && '_active'}`
    },
    get logoFullClass() {
      return `logo-full ${!menuRolled && '_active'}`
    }
  }

  return (
    <BrowserRouter>
      <Layout className="main-layout">
        <Sider trigger={null} collapsible collapsed={menuRolled}>
          <div className="logo-wrap">
          <img className="logo" src={Logo} alt="logo"/>
            {!menuRolled && 
              <span className="logo-text">DNR.dev</span>
            }
          </div>
          <Menu defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={computed.defaultOpenKeys} theme="dark" mode="inline">
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="/category" icon={<UserOutlined />}>
              <NavLink to="/category">Категории</NavLink>
            </Menu.Item>
            <Menu.Item key="/news" icon={<UserOutlined />}>
              <NavLink to="/news">Новости</NavLink>
            </Menu.Item>
            <Menu.Item key="/users" icon={<UserOutlined />}>
              <NavLink to="/users">Пользователи</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="wrap">
          <Header className="header" style={{ padding: 0 }}>
            {React.createElement(menuRolled ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setMenuRolled(!menuRolled)
            })}
            <div className="main__user">
              <Avatar src='' />
              <Dropdown overlay={UserDropDownMenu}>
                <Button className="main__user-nav-btn">
                  {'session?.user?.email'} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Header>
          <Content className="content">
            <AuthorizedRouters />
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}
