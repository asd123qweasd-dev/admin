import React, { FC } from 'react'
import styled from '@emotion/styled'
import { ApiContainer } from '~/components/apiContainer'
import { PostsTable } from '~/components/tables/posts'
import { Typography, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { Post } from '~/api/posts'

interface GetAllProps { }

const _GetAll: FC<GetAllProps> = () => {
  return (
    <GetAll>
      <Header>
        <Title level={4}>Новости</Title>
        <NavLink to={`/posts/create`}>
          <Button type="primary">Создать</Button>
        </NavLink>
      </Header>
      <ApiContainer url="/posts">
        {(data: Post[]|undefined) => (
          <PostsTable data={data} />
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
