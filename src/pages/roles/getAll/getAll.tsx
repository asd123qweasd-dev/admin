import React, { FC } from 'react'
import styled from '@emotion/styled'
import { ApiContainer } from '~/components/apiContainer'
import { Roles as RolesTables } from '~/components/tables/roles'
import { Typography, Button } from 'antd'
import { NavLink } from 'react-router-dom'

interface GetAllProps { }

const _GetAll: FC<GetAllProps> = () => {
  return (
    <GetAll>
      <Header>
        <Title level={4}>Роли</Title>
        <NavLink to={`/roles/create`}>
          <Button type="primary">Создать</Button>
        </NavLink>
      </Header>
      <ApiContainer url="/roles">
        {(data: any) => (
          <RolesTables data={data} />
        )}
      </ApiContainer>
    </GetAll>
  )
}

const GetAll = styled.div``
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`
const Title = styled(Typography.Title)``

export { _GetAll as GetAll }
