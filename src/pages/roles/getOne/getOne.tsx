import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useParams } from 'react-router'
import { Button, Descriptions, Spin, Tag } from 'antd'
import api from '~/api'
import { useGetRole } from '~/hooks/useGetRole'

interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const user = useGetRole(id)
  const [loading, setLoading] = useState<boolean>(false)


  function edit() {
    history.push(`/roles/${id}/update`)
  }

  async function remove() {
    setLoading(true)
    try {
      await api.roles.remove(id)
      history.push(`/roles`)
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
          <Descriptions.Item label="Права">
            {user.data?.permissions?.map(item => {
              return <Tag color="blue" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
            })}
          </Descriptions.Item>
        </Descriptions>
        <Footer>
          <Button danger onClick={remove}>Удалить</Button>
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
