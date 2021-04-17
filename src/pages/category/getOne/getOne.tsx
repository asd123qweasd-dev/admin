import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation, useParams } from 'react-router'
import { Button, Descriptions, Spin, Tag } from 'antd'
import api from '~/api'
import { useGetCategory } from '~/hooks/useGetCategory'
import { formatDate } from '~/helpers/formatDate'
import { mutate } from 'swr'
interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const history = useHistory()
  const category = useGetCategory(Number(id))
  const [loading, setLoading] = useState<boolean>(false)

  function edit() {
    history.push(`/categories/${id}/update`)
  }

  async function remove() {
    setLoading(true)
    try {
      const { data } = await api.category.remove(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }
  
  async function restore() {
    setLoading(true)
    try {
      const { data } = await api.category.restore(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  async function changeStatus() {
    setLoading(true)
    try {
      const { data } = await api.category.status(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  return (
    <GetOne>
      <Spin spinning={category.loading || loading}>
        <Descriptions
          colon={true}
          column={1}
          bordered
          labelStyle={{ width: '200px' }}
          title={category.data?.name}
          extra={<Button type="primary" onClick={edit}>Редактировать</Button>}
        >
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Имя">
            {category.data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color={category.data?.is_active ? 'success' : 'error'}>{category.data?.is_active ? 'Активна' : 'Неактивная'}</Tag>
            <Button type="link" onClick={changeStatus}>Сменить</Button>
          </Descriptions.Item>
          <Descriptions.Item label="Slug">
            {category.data?.slug}
          </Descriptions.Item>
          <Descriptions.Item label="Parent id">
            {category.data?.parent_id}
          </Descriptions.Item>
          <Descriptions.Item label="(SEO)title">
            {category.data?.title}
          </Descriptions.Item>
          <Descriptions.Item label="(SEO)description">
            {category.data?.description}
          </Descriptions.Item>
          <Descriptions.Item label="(SEO)keywords">
            {category.data?.keywords}
          </Descriptions.Item>
          <Descriptions.Item label="Создано">
            {formatDate(category.data?.created_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Обновлено">
            {formatDate(category.data?.updated_at)}
          </Descriptions.Item>
          <Descriptions.Item label="Удалено">
            {formatDate(category.data?.deleted_at)}
          </Descriptions.Item>
        </Descriptions>
        <Footer>
          {category.data?.deleted_at
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
