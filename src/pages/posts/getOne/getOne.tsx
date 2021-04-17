import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useParams } from 'react-router'
import { Button, Descriptions, Form, Spin, Tag } from 'antd'
import api from '~/api'
import { formatDate } from '~/helpers/formatDate'
import { mutate } from 'swr'
import { useGetPosts } from '~/hooks/useGetPosts'
import { errorFields } from '~/helpers'
import { InputEditable } from '~/components/inputEditable'
import { useGetUsers } from '~/hooks/useGetUsers'
import { NavLink } from 'react-router-dom'
import { useGetCategory } from '~/hooks/useGetCategory'
import { descriptionDefaultSettings } from '~/helpers/descriptionSettings'
interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const post = useGetPosts(id)
  const user = useGetUsers(post.data?.author_id || null)
  const category = useGetCategory(post.data?.category_id || null)
  const [loading, setLoading] = useState<boolean>(false)
  const [FormInstance] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(function () {
    const fieldsError = FormInstance.getFieldsError()
    if (!post.data || loading || fieldsError.length) return
    FormInstance.setFieldsValue(post.data)
  }, [post])

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
      setIsEdit(false)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  const { Item } = Descriptions
  return (
    <GetOne>
      <Spin spinning={post.loading || category.loading || user.loading || loading}>
        <Form name="UpdatePost" form={FormInstance} onFinish={submit}>
          <Header>
            { !isEdit && <Button type="primary" onClick={() => setIsEdit(true)}>Редактировать</Button> }
            { isEdit && <Button type="primary" htmlType="submit">Сохранить</Button> }
            { isEdit && <Button type="primary" danger style={{marginLeft: '10px'}} onClick={() => setIsEdit(false)}>Отмена</Button> }
          </Header>
          <Descriptions title="Пост" {...descriptionDefaultSettings}>
            <Item label="id">{id}</Item>
            <Item label="Имя">
              <InputEditable edit={isEdit} name="name" value={post.data?.name} title="Имя" />
            </Item>
            <Item label="Статус">
              { post.data?.deleted_at 
                ? <Tag color="error">Удален</Tag>
                : <>
                    <Tag color={post.data?.published_at ? 'success' : 'orange'}>{ post.data?.published_at ? 'Опубликован' : 'Неопубликован' }</Tag>
                    <Button type="link" onClick={changeStatus}>Сменить</Button>
                  </>
              }
            </Item>
            <Item label="Slug">
              <InputEditable edit={isEdit} name="slug" value={post.data?.slug} title="Slug" />
            </Item>
            <Item label="Автор">
              { post.data?.author_id && <NavLink to={`/users/${post.data?.author_id}`}>{user.data?.name}</NavLink>}
            </Item>
            <Item label="Категория">
              { post.data?.category_id && <NavLink to={`/users/${post.data?.category_id}`}>{category.data?.name}</NavLink>}
            </Item>
          </Descriptions>

          <Descriptions title="SEO" {...descriptionDefaultSettings}>
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

          <Descriptions title="Meta" {...descriptionDefaultSettings}>
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
