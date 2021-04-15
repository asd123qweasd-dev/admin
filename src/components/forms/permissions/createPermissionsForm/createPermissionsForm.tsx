import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import { errorFields } from '~/helpers/showErrorFields'
import api from '~/api'
import { useHistory } from 'react-router'

interface CreatePermissionsFormProps { }

const _CreatePermissionsForm: FC<CreatePermissionsFormProps> = () => {
  const [FormInstance] = Form.useForm()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.permissions.create(value)
      history.push(`/permissions/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <Permissions>
      <Spin spinning={loading}>
        <Title level={3}>Создать новое право</Title>
        <Form
          name="CreatePermissionsForm"
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
    </Permissions>
  )
}

const Permissions = styled.div``
const Title = styled(Typography.Title)``
const form = css`
  &&{
    width: 300px;
    max-width: 300px;
  }
`
export { _CreatePermissionsForm as CreatePermissionsForm }
