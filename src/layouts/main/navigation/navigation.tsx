import React, { FC } from 'react'
import { ApartmentOutlined, ApiOutlined, AppstoreAddOutlined, DashboardOutlined, FileDoneOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'


interface NavigationProps { }

const _Navigation: FC<NavigationProps> = () => {

  function defaultOpenKeys() {
    const result = []
    const directory = ~['/shipowner'].indexOf(window.location.pathname)
    if (directory) result.push('/directory')
    return result
  }

  return (
    <Menu defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={defaultOpenKeys()} theme="dark" mode="inline">
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        <NavLink to="/">Главная</NavLink>
      </Menu.Item>
      <Menu.Item key="/posts" icon={<FileDoneOutlined />}>
        <NavLink to="/posts">Посты</NavLink>
      </Menu.Item>
      <Menu.Item key="/categories" icon={<AppstoreAddOutlined />}>
        <NavLink to="/categories">Категории</NavLink>
      </Menu.Item>
      <Menu.Item key="/users" icon={<UserOutlined />}>
        <NavLink to="/users">Пользователи</NavLink>
      </Menu.Item>
      <Menu.Item key="/roles" icon={<ApartmentOutlined />}>
        <NavLink to="/roles">Роли</NavLink>
      </Menu.Item>
      <Menu.Item key="/permissions" icon={<ApiOutlined />}>
        <NavLink to="/permissions">Права</NavLink>
      </Menu.Item>
    </Menu>
  )
}


export { _Navigation as Navigation }
