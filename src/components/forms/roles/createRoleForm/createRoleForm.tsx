import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import { errorFields } from '~/helpers/showErrorFields'
import api from '~/api'
import { useHistory } from 'react-router'

interface CreateRoleFormProps { }

const _CreateRoleForm: FC<CreateRoleFormProps> = () => {
  const [FormInstance] = Form.useForm()
  const history = useHistory()

  async function submit(value: any) {
    try {
      const { data } = await api.roles.create(value)
      history.push(`/roles/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
  }

  return (
    <User>
      <Spin spinning={false}>
        <Title level={3}>Создать новую роль</Title>
        <Form
          name="CreateRoleForm"
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
export { _CreateRoleForm as CreateRoleForm }
