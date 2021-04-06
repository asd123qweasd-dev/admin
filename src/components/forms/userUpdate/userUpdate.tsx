import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { useUsers, UsersModel } from '~/store/users'
import { css } from '@emotion/css'

interface UserCreateProps {
  id: number
}

const _UserUpdate: FC<UserCreateProps> = ({id}) => {
  const users = useUsers()
  const [FormInstance] = Form.useForm<UsersModel>()

  function submit (value:UsersModel) {
    users.update(id, value)
  }

  return (
    <User>
      <Spin spinning={users.loading}>
        <Title level={3}>Редактирование пользователя</Title>
        <Form
          name="userUpdate"
          fields={users.formUpdate}
          form={FormInstance}
          onFinish={submit}
          onFieldsChange={(changedFields, allFields) => {
            users.handleFormUpdate(allFields)
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
    width: 300px;
    max-width: 300px;
  }
`
export { _UserUpdate as UserUpdate }
