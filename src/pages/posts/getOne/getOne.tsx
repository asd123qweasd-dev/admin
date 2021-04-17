import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation, useParams } from 'react-router'
import { Button, Descriptions, Form, Input, Spin, Tag } from 'antd'
import api from '~/api'
import { formatDate } from '~/helpers/formatDate'
import { mutate } from 'swr'
import { useGetPosts } from '~/hooks/useGetPosts'
import { errorFields, rules } from '~/helpers'
import { InputEditable } from '~/components/inputEditable'
interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const history = useHistory()
  const [FormInstance] = Form.useForm()
  const post = useGetPosts(id)
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(function () {
    if (!post.data || loading) return
    // const { slug, name, title, description, keywords } = post.data
    FormInstance.setFieldsValue(post.data)
  }, [post])

  function edit() {
    if (isEdit) {
      FormInstance.submit()
    } else {
      setIsEdit(true)
    }
  }

  async function remove() {
    setLoading(true)
    try {
      const { data } = await api.posts.remove(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  async function restore() {
    setLoading(true)
    try {
      const { data } = await api.posts.restore(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  async function changeStatus() {
    setLoading(true)
    try {
      const { data } = await api.posts.publish(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.posts.update(id, value)
      mutate(`/posts/${id}`, { ...post.data, ...data })
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setIsEdit(false)
    setLoading(false)
  }

  const setting = {
    column: 1,
    bordered: true,
    labelStyle: { width: '200px' },
    style: { margin: '25px 0' }
  }

  const { Item } = Descriptions
  return (
    <GetOne>
      <Spin spinning={post.loading || loading}>
        <Form name="UpdatePost" form={FormInstance} onFinish={submit}>
          <Header>
            { !isEdit && <Button type="primary" onClick={() => setIsEdit(true)}>Редактировать</Button> }
            { isEdit && <Button type="primary" htmlType="submit">Сохранить</Button> }
            { isEdit && <Button type="primary" danger style={{marginLeft: '10px'}} onClick={() => setIsEdit(false)}>Отмена</Button> }
          </Header>
          <Descriptions title="Пост" {...setting}>
            <Item label="id">{id}</Item>
            <Item label="Имя">
              <InputEditable edit={isEdit} name="name" value={post.data?.name} title="Имя" />
            </Item>
            <Item label="Статус">
              <Tag color={post.data?.published_at ? 'success' : 'error'}>{post.data?.published_at ? 'Опубликован' : 'Неопубликован'}</Tag>
              <Button type="link" onClick={changeStatus}>Сменить</Button>
            </Item>
            <Item label="Slug">
              <InputEditable edit={isEdit} name="slug" value={post.data?.slug} title="Slug" />
            </Item>
          </Descriptions>

          <Descriptions title="SEO" {...setting}>
            <Item label="title">
              <InputEditable edit={isEdit} name="title" value={post.data?.title} title="title" />
            </Item>
            <Item label="description">
              <InputEditable edit={isEdit} name="description" value={post.data?.description} title="description" />
            </Item>
            <Item label="keywords">
              <InputEditable edit={isEdit} name="keywords" value={post.data?.keywords} title="keywords" />
            </Item>
          </Descriptions>

          <Descriptions title="Meta" {...setting}>
            <Item label="Создано">
              {formatDate(post.data?.created_at)}
            </Item>
            <Item label="Обновлено">
              {formatDate(post.data?.updated_at)}
            </Item>
            <Item label="Удалено">
              {formatDate(post.data?.deleted_at)}
            </Item>
          </Descriptions>
        </Form>
        <Footer>
          {post.data?.deleted_at
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
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
`
export { _GetOne as GetOne }
