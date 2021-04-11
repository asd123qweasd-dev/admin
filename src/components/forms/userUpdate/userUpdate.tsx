import React, { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import api from '~/api'
import { errorFields } from '~/helpers/showErrorFields'
import { useUser } from '~/hooks/useUser'
import { useHistory } from 'react-router-dom'

interface UserCreateProps {
  id: string
}

const _UserUpdate: FC<UserCreateProps> = ({ id }) => {
  const [FormInstance] = Form.useForm()
  const history = useHistory()
  const user = useUser(id)

  useEffect(function () {
    if (!user.data) return
    const { name, email } = user.data
    FormInstance.setFieldsValue({ name, email })
  }, [user])

  async function submit(value: any) {
    try {
      const { data } = await api.users.update(id, value)
      history.push(`/users/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
  }

  return (
    <User>
      <Spin spinning={false}>
        <Title level={3}>Редактирование пользователя</Title>
        <Form
          name="userUpdate"
          form={FormInstance}
          onFinish={submit}
          className={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Введите Имя' }]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input placeholder="Email" />
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
