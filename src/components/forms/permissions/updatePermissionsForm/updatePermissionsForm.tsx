import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { css } from '@emotion/css'
import api from '~/api'
import { errorFields } from '~/helpers/showErrorFields'
import { useHistory } from 'react-router-dom'
import { useGetPermissions } from '~/hooks/useGetPermissions'
import {mutate} from 'swr'

interface UpdatePermissionsFormProps {
  id: string
}

const _UpdatePermissionsForm: FC<UpdatePermissionsFormProps> = memo(({ id }) => {
  const [FormInstance] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const permission = useGetPermissions(id)

  useEffect(function () {
    if (!permission.data || loading) return
    const { name } = permission.data
    FormInstance.setFieldsValue({ name })
  }, [permission])

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.permissions.update(id, value)
      console.log(permission);
      mutate(`/permissions/${id}`, {...permission.data, ...data})
      history.push(`/permissions/${data.id}`)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <Permissions>
      <Spin spinning={permission.loading || loading}>
        <Title level={3}>Редактирование права</Title>
        <Form
          name="UpdatePermissionsForm"
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
    </Permissions>
  )
})

const Permissions = styled.div``
const Title = styled(Typography.Title)``
const form = css`
  &&{
    width: 300px;
    max-width: 300px;
  }
`
export { _UpdatePermissionsForm as UpdatePermissionsForm }
