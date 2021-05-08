import React, { FC } from 'react'
import styled from '@emotion/styled'
import { ApiContainer } from '~/components/apiContainer'
import { PostsTable } from '~/components/tables/posts'
import { Typography, Button } from 'antd'
import { NavLink, useHistory } from 'react-router-dom'
import { Post } from '~/api/posts'
import { S3View } from '~/components/s3View'
import { S3 } from '~/components/s3View/s3View'
import useSWR from 'swr'
import { defaultFetcher } from '~/lib/axios'

interface GetAllProps {}


const _GetAll: FC<GetAllProps> = () => {
  const history = useHistory()
  const { data, error } = useSWR<S3>(s3Route(), defaultFetcher)
  
  function s3Route() {
    return `https://s3.dnr.dev${history.location.pathname.slice(3)}`
  }
  
  return (
    <GetAll>
      <Header>
        <Title level={4}>Файлы S3</Title>
      </Header>
      <S3View data={data} error={error}/>
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
const Title = styled(Typography.Title)`
  /* margin-left: 10px; */
`

export { _GetAll as GetAll }
