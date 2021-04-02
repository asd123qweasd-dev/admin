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
        <Menu.Item key="1">Настройки</Menu.Item>
        <Menu.Item key="2" onClick={logout}>Выйти</Menu.Item>
      </Menu>
    )
  }

  return (
    <User>
      <Avatar src={UserImage} />
      <UserBar overlay={UserDropDownMenu}>
        <Button> {user?.name} <DownOutlined /> </Button>
      </UserBar>
    </User>
  )
}

const User = styled.div`
  margin-right: 15px;
`
const UserBar = styled(Dropdown)`
  border: none;
`

export { _User as User }
