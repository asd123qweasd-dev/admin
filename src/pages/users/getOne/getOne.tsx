import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation, useParams } from 'react-router'
import { Button, Descriptions, Spin  } from 'antd'
import api from '~/api'
import { mutate } from 'swr'
import { useGetUser } from '~/hooks/useGetUser'
import { UserRolesUpdate } from '~/components/forms/userRolesUpdate'
import { formatDate } from '~/helpers/formatDate'

interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const location = useLocation()
  const user = useGetUser(id)
  const [loading, setLoading] = useState<boolean>(false)

  function edit() {
    history.push(`/users/${id}/update`)
  }

  async function remove() {
    setLoading(true)
    try {
      const { data } = await api.users.remove(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  async function restore() {
    setLoading(true)
    try {
      const { data } = await api.users.restore(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  return (
    <GetOne>
      <Spin spinning={user.loading || loading}>
        <Descriptions
          colon={true}
          column={1}
          bordered
          labelStyle={{ width: '200px' }}
          title={user.data?.name}
          extra={<Button type="primary" onClick={edit}>Редактировать</Button>}
        >
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Имя">{user.data?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.data?.email}</Descriptions.Item>
          <Descriptions.Item label="Роли">
            <UserRolesUpdate userId={id}/>
          </Descriptions.Item>
          <Descriptions.Item label="Подтвержден">{formatDate(user.data?.email_verified_at)}</Descriptions.Item>
          <Descriptions.Item label="Создан">{formatDate(user.data?.created_at)}</Descriptions.Item>
          <Descriptions.Item label="Обновлен">{formatDate(user.data?.updated_at)}</Descriptions.Item>
          <Descriptions.Item label="Удален">{formatDate(user.data?.deleted_at)}</Descriptions.Item>
        </Descriptions>
        <Footer>
          {user.data?.deleted_at
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
