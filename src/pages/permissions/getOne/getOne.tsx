import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useParams } from 'react-router'
import { Button, Descriptions, Spin, Tag } from 'antd'
import api from '~/api'
import { useGetPermissions } from '~/hooks/useGetPermissions'

interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const permission = useGetPermissions(id)
  const [loading, setLoading] = useState<boolean>(false)


  function edit() {
    history.push(`/permissions/${id}/update`)
  }

  async function remove() {
    setLoading(true)
    try {
      await api.permissions.remove(id)
      history.push(`/permissions`)
    } catch (err) { }
    setLoading(false)
  }

  return (
    <GetOne>
      <Spin spinning={permission.loading || loading}>
        <Descriptions
          colon={true}
          column={1}
          bordered
          labelStyle={{ width: '200px' }}
          title={permission.data?.name}
          extra={<Button type="primary" onClick={edit}>Редактировать</Button>}
        >
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Право">
            <Tag color="processing">{permission.data?.name}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Используется в ролях">
            {permission.data?.roles?.map(item => {
              return <Tag color="orange" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
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
