import React, { FC } from 'react'
import styled from '@emotion/styled'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
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
  )
}


export { _Navigation as Navigation }
