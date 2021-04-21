import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { errorFields } from '~/helpers/showErrorFields'
import api from '~/api'
import { useHistory } from 'react-router'
import { PostInput } from '~/api/posts'
import { rules } from '~/helpers'
import { TextEditor } from '~/components/textEditor'
import { InputPickAuthorId } from '~/components/inputPickAuthorId'
import { InputPickCategoryId } from '~/components/inputPickCategoryId'

interface СreatePostFormProps { }

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
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
      history.push(`/posts/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <User>
      <Spin spinning={loading}>
        <Title level={4}>Создать пост</Title>
        <Form
          name="СreatePostForm"
          form={FormInstance}
          onFinish={submit}
          { ...formItemLayout }
        >
          <FormWrap>
            <Form.Item name="name" label="Имя" rules={rules(true, 'Введите Имя')}>
              <Input placeholder="Имя" />
            </Form.Item>

            <Form.Item name="intro" label="intro" rules={rules(false, 'Введите intro')}>
              <Input placeholder="intro" />
            </Form.Item>

            <Form.Item name="author_id" label="author_id" rules={rules(true, 'Введите author_id')}>
              <InputPickAuthorId />
            </Form.Item>

            <Form.Item name="category_id" label="category_id" rules={rules(true, 'Введите category_id')}>
              <InputPickCategoryId />
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
          
          <Title level={5}>Тело статьи</Title>
          <EditorWrap>
            <Form.Item name="body" rules={rules(false, 'Введите body')} >
              <TextEditor />
            </Form.Item>
          </EditorWrap>
          
          <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
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

const EditorWrap = styled.div`
  max-width: 700px;
  padding: 25px 20px;
`
export { _СreatePostForm as СreatePostForm }
