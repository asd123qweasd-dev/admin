import React, { FC } from 'react'
import { Input, Form, Button, Spin } from 'antd'
import { css } from '@emotion/css'
import { LoginFormData } from '~/store/loginForm/slice'
import { useLoginForm } from '~/store/loginForm'
import { UserOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { FormVisibleType } from '~/pages/login/login'

type RestoreFormProps = {
  changeForm: (type: FormVisibleType) => void
}

export const RestoreForm: FC<RestoreFormProps> = ({changeForm}) => {
  const loginForm = useLoginForm()
  const [FormInstance] = Form.useForm<LoginFormData>()

  return (
    <Wrap>
      <Spin spinning={loginForm.loading}>
        <Form
          name="restore"
          fields={loginForm.form}
          form={FormInstance}
          onFinish={loginForm.submit}
          onFieldsChange={(changedFields, allFields) => {
            loginForm.changeForm(allFields)
          }}
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
  }
`

const BtnInline = styled(Button)`
  display: inline;
  padding: 4px 0;
`
const MiddleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Wrap = styled.div`
  .login-form-button {
    width: 100%;
  }

  .site-form-item-icon {
    color: rgba(0, 0, 0, 0.25);
  }
`
