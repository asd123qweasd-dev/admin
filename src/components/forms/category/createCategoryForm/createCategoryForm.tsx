import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import { errorFields } from '~/helpers/showErrorFields'
import api from '~/api'
import { useHistory } from 'react-router'
import { CategoryInput } from '~/api/category'
import { rules } from '~/helpers'

interface CreateCategoryFormProps { }

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  }
}

const _CreateCategoryForm: FC<CreateCategoryFormProps> = () => {
  const [FormInstance] = Form.useForm<CategoryInput>()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)

  async function submit(value: CategoryInput) {
    setLoading(true)
    const {slug, name, title, description, keywords} = value
    try {
      const { data } = await api.category.create({slug, name, title, description, keywords})
      history.push(`/category/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <User>
      <Spin spinning={loading}>
        <Title level={3}>Создать новую роль</Title>
        <Form
          name="CreateCategoryForm"
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
            <Button type="primary" htmlType="submit" >
              Создать
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
export { _CreateCategoryForm as CreateCategoryForm }
