import React, { FC, useState } from 'react'
import { Input, Form, Button, Spin, notification } from 'antd'
import { css } from '@emotion/css'
import { UserOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { FormVisibleType } from '~/components/authForm'
import { errorFields } from '~/helpers'
import { api } from '~/api'

type RestoreFormModel = {
  email: string
  remember?: boolean
}

type RestoreFormProps = {
  changeForm: (type: FormVisibleType) => void
}

export const RestoreForm: FC<RestoreFormProps> = ({changeForm}) => {
  const [FormInstance] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  
  async function submit (values:RestoreFormModel) {
    setLoading(true)
    const { email } = values
    try {
      const { data } = await api.auth.password.email({ email })
      notification.success({
        message: data.status
      })
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }

  return (
    <Wrap>
      <Spin spinning={loading}>
        <Form
          name="restore"
          form={FormInstance}
          onFinish={submit}
          className={form}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Востановить
            </Button>
            <BtnInline type="link" onClick={() => changeForm('login')}>войти</BtnInline> или <BtnInline type="link" onClick={() => changeForm('registration')}>зарегистрироваться!</BtnInline>
          </Form.Item>
        </Form>
      </Spin>
    </Wrap>
  )
}

const form = css`
  &&{
    margin-top: 50px;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    padding: 24px;
    background: #fff;
    width: 300px;
    max-width: 300px;
  }
`

const BtnInline = styled(Button)`
  display: inline;
  padding: 4px 0;
`
const Wrap = styled.div`
  .login-form-button {
    width: 100%;
  }

  .site-form-item-icon {
    color: rgba(0, 0, 0, 0.25);
  }
`
