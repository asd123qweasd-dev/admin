import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useParams } from 'react-router'
import { Button, Descriptions, Form, Spin, Tag } from 'antd'
import api from '~/api'
import { useGetPermissions } from '~/hooks/useGetPermissions'
import { mutate } from 'swr'
import { errorFields } from '~/helpers'
import { descriptionDefaultSettings } from '~/helpers/descriptionSettings'
import { InputEditable } from '~/components/inputs/inputEditable'

interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const permission = useGetPermissions(id)
  const [loading, setLoading] = useState<boolean>(false)
  const [FormInstance] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(function () {
    const fieldsError = FormInstance.getFieldsError()
    if (!permission.data || loading ||fieldsError.length) return
    const { name } = permission.data
    FormInstance.setFieldsValue({ name })
  }, [permission])

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.permissions.update(id, value)
      mutate(`/permissions/${id}`, { ...permission.data, ...data })
      setIsEdit(false)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  async function remove() {
    setLoading(true)
    try {
      await api.permissions.remove(id)
      history.push(`/permissions`)
    } catch (err) { }
    setLoading(false)
  }

  return (
    <GetOne>
      <Spin spinning={permission.loading || loading}>
        <Form name="UpdateUser" form={FormInstance} onFinish={submit}>
          <Header>
            { !isEdit && <Button type="primary" onClick={() => setIsEdit(true)}>Редактировать</Button> }
            { isEdit && <Button type="primary" htmlType="submit">Сохранить</Button> }
            { isEdit && <Button type="primary" danger style={{marginLeft: '10px'}} onClick={() => setIsEdit(false)}>Отмена</Button> }
          </Header>
          <Descriptions title="Permission" { ...descriptionDefaultSettings }>
            <Descriptions.Item label="id">{id}</Descriptions.Item>
            <Descriptions.Item label="Имя">
              <InputEditable edit={isEdit} name="name" value={permission.data?.name} title="Имя" />
            </Descriptions.Item>
            <Descriptions.Item label="Используется в ролях">
              {permission.data?.roles?.map(item => {
                return <Tag color="orange" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
              })}
            </Descriptions.Item>
          </Descriptions>
          <Footer>
            <Button danger onClick={remove}>Удалить</Button>
          </Footer>
        </Form>
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
