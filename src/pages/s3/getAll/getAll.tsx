import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Typography, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { S3View } from '~/components/s3View'
import useSWR from 'swr'
import { defaultFetcher } from '~/lib/axios'
import { S3 } from '~/types/s3'
import { S3_BASE_URL } from '~/config'

interface GetAllProps {}


const _GetAll: FC<GetAllProps> = () => {
  const history = useHistory()
  const { data, error } = useSWR<S3>(s3Route(), defaultFetcher)
  
  function s3Route() {
    return `${S3_BASE_URL}${history.location.pathname.slice(3)}`
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
