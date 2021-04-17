import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useParams } from 'react-router'
import { Button, Descriptions, Form, Spin, Tag  } from 'antd'
import api from '~/api'
import { mutate } from 'swr'
import { useGetUsers } from '~/hooks/useGetUsers'
import { UserRolesUpdate } from '~/components/forms/userRolesUpdate'
import { formatDate } from '~/helpers/formatDate'
import { errorFields } from '~/helpers'
import { descriptionDefaultSettings } from '~/helpers/descriptionSettings'
import {InputEditable} from '~/components/inputEditable'
import { UserStatus } from '~/components/userStatus'

interface GetOneProps { }

const _GetOne: FC<GetOneProps> = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const user = useGetUsers(Number(id))
  const [loading, setLoading] = useState<boolean>(false)
  const [FormInstance] = Form.useForm()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(function () {
    const fieldsError = FormInstance.getFieldsError()
    if (!user.data || loading ||fieldsError.length) return
    const { name, email } = user.data
    FormInstance.setFieldsValue({ name, email })
  }, [user])

  async function submit(value: any) {
    setLoading(true)
    try {
      const { data } = await api.users.update(id, value)
      mutate(`/users/${id}`, { ...user.data, ...data })
      setIsEdit(false)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  async function remove() {
    setLoading(true)
    try {
      const { data } = await api.users.remove(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  async function restore() {
    setLoading(true)
    try {
      const { data } = await api.users.restore(id)
      mutate(location.pathname, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  const { Item } = Descriptions

  return (
    <GetOne>
      <Spin spinning={user.loading || loading}>
        <Form name="UpdateUser" form={FormInstance} onFinish={submit}>
          <Header>
            { !isEdit && <Button type="primary" onClick={() => setIsEdit(true)}>Редактировать</Button> }
            { isEdit && <Button type="primary" htmlType="submit">Сохранить</Button> }
            { isEdit && <Button type="primary" danger style={{marginLeft: '10px'}} onClick={() => setIsEdit(false)}>Отмена</Button> }
          </Header>
        
          <Descriptions title="Пользователь" { ...descriptionDefaultSettings }>
            <Item label="id">{id}</Item>
            <Item label="Имя">
              <InputEditable edit={isEdit} name="name" value={user.data?.name} title="Имя" />
            </Item>
            <Item label="Статус">
              <UserStatus deleted={user.data?.deleted_at} verified={user.data?.email_verified_at}/>
            </Item>
            <Item label="Email">
              <InputEditable edit={isEdit} name="email" value={user.data?.email} title="Email" />  
            </Item>
            <Item label="Роли">
              <UserRolesUpdate edit={isEdit} userId={id}/>
            </Item>
          </Descriptions>

          <Descriptions title="Meta" {...descriptionDefaultSettings}>
            <Item label="Создан">
              {formatDate(user.data?.created_at)}
            </Item>
            <Item label="Верифицирован">
              {formatDate(user.data?.email_verified_at)}
            </Item>
            <Item label="Обновлен">
              {formatDate(user.data?.updated_at)}
            </Item>
            <Item label="Удален">
              {formatDate(user.data?.deleted_at)}
            </Item>
          </Descriptions>
        </Form>
        <Footer>
          {user.data?.deleted_at
            ? <Button onClick={restore}>Восстановить</Button>
            : <Button danger onClick={remove}>Удалить</Button>
          }
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
