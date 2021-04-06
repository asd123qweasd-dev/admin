import React, { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { useUserForm } from '~/store/userForm'
import { css } from '@emotion/css'
import api from '~/api'
import { UserFormModel } from '~/store/userForm/slice'

interface UserProps {
  id?: number
}

const createText = {
  title: 'Создать нового пользоваля',
  submit: 'Создать'
}
const updateText = {
  title: 'Редактирование пользователя',
  submit: 'Сохранить'
}

const _User: FC<UserProps> = ({id}) => {
  const userForm = useUserForm()
  const [FormInstance] = Form.useForm<UserFormModel>()

  const text = id ? updateText : createText

  useEffect(function(){
    getUserData()
  }, [id])

  async function getUserData () {
    if (!id) return
    userForm.changeLoader(true)
    try {
      const {data} = await api.users.getOne(id)
      FormInstance.setFieldsValue({
        name: data.name || '',
        email: data.email || ''
      })
    } catch (err) {}
    userForm.changeLoader(false)
  }

  function submit (value:UserFormModel) {
    id
      ? userForm.update(id, value)
      : userForm.create(value)
  }

  return (
    <User>
      <Spin spinning={userForm.loading}>
        <Title level={3}>{text.title}</Title>
        <Form
          name="restore"
          fields={userForm.form}
          form={FormInstance}
          onFinish={submit}
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
