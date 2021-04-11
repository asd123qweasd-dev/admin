import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation, useParams } from 'react-router'
import { Button, Descriptions, Spin } from 'antd'
import { User } from '~/api/users'
import dayjs from 'dayjs'
import api from '~/api'
import useSWR, { mutate } from 'swr'
import axios from '~/lib/axios'

interface GetOneProps { }
const fetcher = (url:string) => axios.get(url).then(res => res.data)

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{id: string}>()
  const history = useHistory()
  const location = useLocation()
  const {data, error} = useSWR<User>(location.pathname, fetcher)
  const swrLoading = (!data && !error)
  const [loading, setLoading] = useState<boolean>(!data && !error)

  console.log(data);
  
  useEffect(function(){
    setLoading(!data && !error)
  }, [data, error])

  function formatDate(value: string | null | undefined) {
    return value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
  }

  function edit () {
    history.push(`/users/${id}/update`)
  }

  async function remove () {
    setLoading(true)
    try {
      await mutate(location.pathname, api.users.remove(id).then(res => res.data))
    }catch(err) {}
    setLoading(false)
  }

  async function restore () {
    setLoading(true)
    try {
      await mutate(location.pathname, api.users.restore(id).then(res => res.data))
    }catch(err) {}
    setLoading(false)
  }
  
  return (
    <GetOne>
      <Spin spinning={swrLoading || loading}>
        <Descriptions
          colon={true}
          column={1}
          bordered
          labelStyle={{ width: '200px' }}
          title={data?.name}
          extra={<Button type="primary" onClick={edit}>Редактировать</Button>}
          >
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Имя">{data?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
          <Descriptions.Item label="Подтвержден">{formatDate(data?.email_verified_at)}</Descriptions.Item>
          <Descriptions.Item label="Создан">{formatDate(data?.created_at)}</Descriptions.Item>
          <Descriptions.Item label="Обновлен">{formatDate(data?.updated_at)}</Descriptions.Item>
          <Descriptions.Item label="Удален">{formatDate(data?.deleted_at)}</Descriptions.Item>
        </Descriptions>
        <Footer>
          { data?.deleted_at
            ? <Button onClick={restore}>Восстановить</Button>
            : <Button danger onClick={remove}>Удалить</Button>
          }
        </Footer>
        </Spin>
    </GetOne>
  )
}

const GetOne = styled.div``
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
`
export { _GetOne as GetOne }
