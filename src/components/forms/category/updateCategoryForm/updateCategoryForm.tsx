import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import api from '~/api'
import { errorFields, rules } from '~/helpers'
import { useHistory } from 'react-router-dom'
import { mutate } from 'swr'
import { CategoryInput } from '~/api/category'
import { useGetCategory } from '~/hooks/useGetCategory'

interface UpdateCategoryFormProps {
  id: string
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

const _UpdateCategoryForm: FC<UpdateCategoryFormProps> = ({ id }) => {
  const [FormInstance] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const category = useGetCategory(Number(id))

  useEffect(function () {
    if (!category.data || loading) return
    const { slug, name, title, description, keywords } = category.data
    FormInstance.setFieldsValue({ slug, name, title, description, keywords })
  }, [category])

  async function submit(value: CategoryInput) {
    setLoading(true)
    const { slug, name, title, description, keywords } = value
    try {
      const { data } = await api.category.update(id, { slug, name, title, description, keywords })
      mutate(`/categories/${id}`, { ...category.data, ...data })
      history.push(`/categories/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <User>
      <Spin spinning={category.loading || loading}>
        <Title level={3}>Редактирование роли</Title>
        <Form
          name="UpdateCategoryForm"
          form={FormInstance}
          onFinish={submit}
          className={form}
          { ...formItemLayout }
        >
          <Form.Item name="name" label="Имя" rules={rules(true, 'Введите Имя')}>
            <Input placeholder="Имя" />
          </Form.Item>

          <Form.Item name="slug" label="slug" rules={rules(true, 'Введите slug')}>
            <Input placeholder="Slug" />
          </Form.Item>

          <Form.Item name="title" label="title" rules={rules(true, 'Введите title')}>
            <Input placeholder="title" />
          </Form.Item>

          <Form.Item name="description" label="description" rules={rules(true, 'Введите description')}>
            <Input placeholder="description" />
          </Form.Item>

          <Form.Item name="keywords" label="keywords" rules={rules(true, 'Введите keywords')}>
            <Input placeholder="keywords" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </User>
  )
}

const User = styled.div``
const Title = styled(Typography.Title)``
const form = css`
  &&{
    width: 550px;
    max-width: 100%;
  }
`
export { _UpdateCategoryForm as UpdateCategoryForm }
