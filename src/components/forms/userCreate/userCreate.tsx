import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'

interface UserCreateProps {}

const _UserCreate: FC<UserCreateProps> = () => {
  const [FormInstance] = Form.useForm()

  function submit () {
  }

  return (
    <User>
      <Spin spinning={false}>
        <Title level={3}>Создать нового пользоваля</Title>
        <Form
          name="userCreate"
          // fields={users.formCreate}
          form={FormInstance}
          onFinish={submit}
          onFieldsChange={(changedFields, allFields) => {
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
    width: 300px;
    max-width: 300px;
  }
`
export { _UserCreate as UserCreate }