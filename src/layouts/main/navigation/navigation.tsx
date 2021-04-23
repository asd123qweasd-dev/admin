import React, { FC } from 'react'
import { ApartmentOutlined, ApiOutlined, AppstoreAddOutlined, DashboardOutlined, FileDoneOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink, useHistory } from 'react-router-dom'
import { Menu } from 'antd'


interface NavigationProps { }

const _Navigation: FC<NavigationProps> = () => {
  const history = useHistory()

  const routeSplit = history.location.pathname.split('/')
  const activeRoute = routeSplit[1] || 'main'

  return (
    <Menu defaultSelectedKeys={[activeRoute]} theme="dark" mode="inline">
      <Menu.Item key="main" icon={<DashboardOutlined />}>
        <NavLink to="/">Главная</NavLink>
      </Menu.Item>
      <Menu.Item key="posts" icon={<FileDoneOutlined />}>
        <NavLink to="/posts">Посты</NavLink>
      </Menu.Item>
      <Menu.Item key="categories" icon={<AppstoreAddOutlined />}>
        <NavLink to="/categories">Категории</NavLink>
      </Menu.Item>
      <Menu.Item key="users" icon={<UserOutlined />}>
        <NavLink to="/users">Пользователи</NavLink>
      </Menu.Item>
      <Menu.Item key="roles" icon={<ApartmentOutlined />}>
        <NavLink to="/roles">Роли</NavLink>
      </Menu.Item>
      <Menu.Item key="permissions" icon={<ApiOutlined />}>
        <NavLink to="/permissions">Права</NavLink>
      </Menu.Item>
    </Menu>
  )
}


export { _Navigation as Navigation }
