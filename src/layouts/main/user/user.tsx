import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useAuth } from '~/store/auth'
import UserImage from '~/assets/user.png'

interface UserProps { }

const _User: FC<UserProps> = () => {
  const { logout, user } = useAuth()
  
  function UserDropDownMenu() {
    return (
      <Menu>
        <Menu.Item key="1" onClick={logout}>Выйти</Menu.Item>
        <Menu.Item key="2">asd</Menu.Item>
      </Menu>
    )
  }

  return (
    <User>
      <Avatar src={UserImage} />
      <Dropdown overlay={UserDropDownMenu}>
        <Button> {user?.name} <DownOutlined /> </Button>
      </Dropdown>
    </User>
  )
}

const User = styled.div``

export { _User as User }
