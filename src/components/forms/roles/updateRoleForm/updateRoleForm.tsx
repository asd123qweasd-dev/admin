import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import api from '~/api'
import { errorFields } from '~/helpers/showErrorFields'
import { useHistory } from 'react-router-dom'
import { useGetRole } from '~/hooks/useGetRole'
import { mutate } from 'swr'

interface UpdateRoleFormProps {
  id: string
}

const _UpdateRoleForm: FC<UpdateRoleFormProps> = ({ id }) => {
  const [FormInstance] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const user = useGetRole(id)

  useEffect(function () {
    if (!user.data  || loading) return
    const { name } = user.data
    FormInstance.setFieldsValue({ name })
  }, [user])

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.roles.update(id, value)
      mutate(`/roles/${id}`, {...user.data, ...data})
      history.push(`/roles/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <User>
      <Spin spinning={user.loading || loading}>
        <Title level={3}>Редактирование роли</Title>
        <Form
          name="UpdateRoleForm"
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
export { _UpdateRoleForm as UpdateRoleForm }
