import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import { errorFields } from '~/helpers/showErrorFields'
import api from '~/api'
import { useHistory } from 'react-router'

interface UserCreateProps { }

const _UserCreate: FC<UserCreateProps> = () => {
  const [FormInstance] = Form.useForm()
  const history = useHistory()

  async function submit(value: any) {
    try {
      const { data } = await api.users.create(value)
      history.push(`/users/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
  }

  return (
    <User>
      <Spin spinning={false}>
        <Title level={3}>Создать нового пользоваля</Title>
        <Form
          name="userCreate"
          form={FormInstance}
          onFinish={submit}
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
