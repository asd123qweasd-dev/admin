import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useParams } from 'react-router'
import { Button, Descriptions, Form, Spin } from 'antd'
import api from '~/api'
import { useGetRole } from '~/hooks/useGetRole'
import { RolePermissionsUpdate } from '~/components/forms/rolePermissionsUpdate'
import { errorFields } from '~/helpers'
import { mutate } from 'swr'
import { descriptionDefaultSettings } from '~/helpers/descriptionSettings'
import { InputEditable } from '~/components/inputs/inputEditable'
interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const role = useGetRole(id)
  const [loading, setLoading] = useState<boolean>(false)
  const [FormInstance] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(function () {
    const fieldsError = FormInstance.getFieldsError()
    if (!role.data || loading ||fieldsError.length) return
    const { name } = role.data
    FormInstance.setFieldsValue({ name })
  }, [role])

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.roles.update(id, value)
      mutate(`/roles/${id}`, { ...role.data, ...data })
      setIsEdit(false)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  async function remove() {
    setLoading(true)
    try {
      await api.roles.remove(id)
      history.push(`/roles`)
    } catch (err) { }
    setLoading(false)
  }

  return (
    <GetOne>
      <Spin spinning={role.loading || loading}>
      <Form name="UpdateUser" form={FormInstance} onFinish={submit}>
          <Header>
            { !isEdit && <Button type="primary" onClick={() => setIsEdit(true)}>Редактировать</Button> }
            { isEdit && <Button type="primary" htmlType="submit">Сохранить</Button> }
            { isEdit && <Button type="primary" danger style={{marginLeft: '10px'}} onClick={() => setIsEdit(false)}>Отмена</Button> }
          </Header>
        <Descriptions title="Роль" { ...descriptionDefaultSettings }>
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="Имя">
            <InputEditable edit={isEdit} name="name" value={role.data?.name} title="Имя" />
          </Descriptions.Item>
          <Descriptions.Item label="Права">
            <RolePermissionsUpdate edit={isEdit} roleId={id}/>
          </Descriptions.Item>
        </Descriptions>
        </Form>
        <Footer>
          <Button danger onClick={remove}>Удалить</Button>
        </Footer>
      </Spin>
    </GetOne>
  )
}

const GetOne = styled.div``
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
`
export { _GetOne as GetOne }
