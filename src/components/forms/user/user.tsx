import React, { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { useUserForm } from '~/store/userForm'
import { css } from '@emotion/css'
import api from '~/api'

interface UserProps {
  id?: number
}

const createText = {
  title: 'Создать нового пользоваля',
  submit: 'Создать'
}
const updateText = {
  title: 'Обновить пользоваля',
  submit: 'Обновить'
}

const _User: FC<UserProps> = ({id}) => {
  const userForm = useUserForm()
  const [FormInstance] = Form.useForm()

  const hasCreate = () => Boolean(!id)
  const text = hasCreate() ? createText : updateText

  useEffect(function(){
    getUserData()
  }, [id])

  async function getUserData () {
    if (!id) return
    userForm.changeLoader(true)
    try {
      const {data:{name, email}} = await api.users.getOne(id)
      FormInstance.setFieldsValue({name, email})
    } catch (err) {}
    userForm.changeLoader(false)
  }

  return (
    <User>
      <Spin spinning={userForm.loading}>
        <Title level={3}>{text.title}</Title>
        <Form
          name="restore"
          fields={userForm.form}
          form={FormInstance}
          onFinish={userForm.submit}
          onFieldsChange={(changedFields, allFields) => {
            userForm.changeForm(allFields)
          }}
          className={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {text.submit}
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
    width: 300px;
    max-width: 300px;
  }
`
export { _User as User }
