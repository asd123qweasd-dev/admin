import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { ApiContainer } from '~/components/apiContainer'
import { PostsTable } from '~/components/tables/posts'
import { Typography, Button, Modal } from 'antd'
import { NavLink } from 'react-router-dom'
import { Post } from '~/api/posts'
import { СreatePostForm } from '~/components/forms/createPostForm'

interface GetAllProps { }

const _GetAll: FC<GetAllProps> = () => {
  const [createPostVisible, setCreatePostVisible] = useState<boolean>(false)

  return (
    <GetAll>
      <Header>
        <Title level={4}>Новости</Title>
        <Modal title="Создать пост" visible={createPostVisible} footer={null} onCancel={() => setCreatePostVisible(false)}>
          <СreatePostForm/>
        </Modal>
        <Button type="primary" onClick={() => setCreatePostVisible(true)}>Создать</Button>
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
