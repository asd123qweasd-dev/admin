import React, { FC } from 'react'
import styled from '@emotion/styled'
import { ApiContainer } from '~/components/apiContainer'
import { CategoryTable } from '~/components/tables/categoryTable'
import { Typography, Button } from 'antd'
import { NavLink } from 'react-router-dom'

interface GetAllProps { }

const _GetAll: FC<GetAllProps> = () => {
  return (
    <GetAll>
      <Header>
        <Title level={4}>Категории</Title>
        <NavLink to={`/categories/create`}>
          <Button type="primary">Создать</Button>
        </NavLink>
      </Header>
      <ApiContainer url="/categories">
        {(data: any) => (
          <CategoryTable data={data} />
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
