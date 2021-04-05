import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useHistory, useParams } from 'react-router'
import { Button, Descriptions } from 'antd'
import { ApiContainer } from '~/components/apiContainer'
import { User } from '~/api/users'
import dayjs from 'dayjs'

interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id }: any = useParams()
  const history = useHistory()

  function formatDate(value: string | null | undefined) {
    return value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
  }

  function edit () {
    history.push(`/users/${id}/update`)
  }
  
  return (
    <GetOne>
      <ApiContainer url={`/users/${id}`}>
        {(data: User | undefined) => (
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
        )}
      </ApiContainer>
    </GetOne>
  )
}

const GetOne = styled.div``

export { _GetOne as GetOne }
