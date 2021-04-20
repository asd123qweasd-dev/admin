import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import { errorFields } from '~/helpers/showErrorFields'
import api from '~/api'
import { useHistory } from 'react-router'
import { PostInput } from '~/api/posts'
import { rules } from '~/helpers'
import { TextEditor } from '~/components/textEditor'

interface СreatePostFormProps { }

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

const _СreatePostForm: FC<СreatePostFormProps> = () => {
  const [FormInstance] = Form.useForm<PostInput>()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)

  async function submit(value: PostInput) {
    setLoading(true)
    try {
      const { data } = await api.posts.create(value)
      // history.push(`/posts/${data.id}`)
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
          name="СreatePostForm"
          form={FormInstance}
          onFinish={submit}
          className={form}
          // { ...formItemLayout }
        >
          <FormWrap>
            <Form.Item name="name" label="Имя" rules={rules(true, 'Введите Имя')}>
              <Input placeholder="Имя" />
            </Form.Item>

            <Form.Item name="intro" label="intro" rules={rules(false, 'Введите intro')}>
              <Input placeholder="intro" />
            </Form.Item>

            <Form.Item name="author_id" label="author_id" rules={rules(true, 'Введите author_id')}>
              <Input placeholder="author_id" />
            </Form.Item>

            <Form.Item name="category_id" label="category_id" rules={rules(true, 'Введите category_id')}>
              <Input placeholder="category_id" />
            </Form.Item>

            <Form.Item name="source_url" label="source_url" rules={rules(false, 'Введите source_url')}>
              <Input placeholder="source_url" />
            </Form.Item>

            <Title level={5}>SEO</Title>
            <Form.Item name="title" label="title" rules={rules(false, 'Введите title')}>
              <Input placeholder="title" />
            </Form.Item>

            <Form.Item name="description" label="description" rules={rules(false, 'Введите description')}>
              <Input placeholder="description" />
            </Form.Item>

            <Form.Item name="keywords" label="keywords" rules={rules(false, 'Введите keywords')}>
              <Input placeholder="keywords" />
            </Form.Item>
          </FormWrap>

          <Form.Item name="body" label="body" rules={rules(false, 'Введите body')}>
            <TextEditor />
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

const FormWrap = styled.div`
  width: 550px;
  max-width: 100%;
`
const form = css`
  &&{
    /* width: 550px;
    max-width: 100%; */
  }
`
export { _СreatePostForm as СreatePostForm }
