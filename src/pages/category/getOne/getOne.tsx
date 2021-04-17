import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useParams } from 'react-router'
import { Button, Descriptions, Form, Spin } from 'antd'
import api from '~/api'
import { useGetCategory } from '~/hooks/useGetCategory'
import { formatDate } from '~/helpers/formatDate'
import { mutate } from 'swr'
import { errorFields } from '~/helpers'
import { descriptionDefaultSettings } from '~/helpers/descriptionSettings'
import { InputEditable } from '~/components/inputEditable'
import { NavLink } from 'react-router-dom'
import { CategoryStatus } from '~/components/categoryStatus'
interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const category = useGetCategory(Number(id))
  const [loading, setLoading] = useState<boolean>(false)
  const [FormInstance] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(function () {
    const fieldsError = FormInstance.getFieldsError()
    if (!category.data || loading || fieldsError.length) return
    const { slug, name, title, description, keywords } = category.data
    FormInstance.setFieldsValue({ slug, name, title, description, keywords })
  }, [category])

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.category.update(id, value)
      mutate(`/categories/${id}`, { ...category.data, ...data })
      setIsEdit(false)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
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

  const { Item } = Descriptions
  return (
    <GetOne>
      <Spin spinning={category.loading || loading}>
        <Form name="UpdateUser" form={FormInstance} onFinish={submit}>
          <Header>
            {!isEdit && <Button type="primary" onClick={() => setIsEdit(true)}>Редактировать</Button>}
            {isEdit && <Button type="primary" htmlType="submit">Сохранить</Button>}
            {isEdit && <Button type="primary" danger style={{ marginLeft: '10px' }} onClick={() => setIsEdit(false)}>Отмена</Button>}
          </Header>
          <Descriptions title="Категория" {...descriptionDefaultSettings}>
            <Item label="id">{id}</Item>
            <Item label="Имя">
              <InputEditable edit={isEdit} name="name" value={category.data?.name} title="title" />
            </Item>
            <Item label="Статус">
              <CategoryStatus id={Number(id)} changed/>
            </Item>
            <Item label="Slug">
              {category.data?.slug}
            </Item>
            <Item label="Parent id">
              { Boolean(category.data?.parent_id) && <NavLink to={`/categories/${category.data?.parent_id}`}>{category.data?.name}</NavLink>}
            </Item>
          </Descriptions>

          <Descriptions title="SEO" {...descriptionDefaultSettings}>
            <Item label="title">
              <InputEditable edit={isEdit} name="title" value={category.data?.title} title="title" />
            </Item>
            <Item label="description">
              <InputEditable edit={isEdit} name="description" value={category.data?.description} title="description" />
            </Item>
            <Item label="keywords">
              <InputEditable edit={isEdit} name="keywords" value={category.data?.keywords} title="keywords" />
            </Item>
          </Descriptions>
          
          <Descriptions title="Meta" {...descriptionDefaultSettings}>
            <Item label="Создан">
              {formatDate(category.data?.created_at)}
            </Item>
            <Item label="Обновлен">
              {formatDate(category.data?.updated_at)}
            </Item>
            <Item label="Удален">
              {formatDate(category.data?.deleted_at)}
            </Item>
          </Descriptions>
          <Footer>
            {category.data?.deleted_at
              ? <Button onClick={restore}>Восстановить</Button>
              : <Button danger onClick={remove}>Удалить</Button>
            }
          </Footer>
        </Form>
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
