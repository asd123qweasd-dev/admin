import React, { FC, useEffect, useState } from 'react'
import { Input, Form, Button, Spin, Checkbox } from 'antd'
import { css } from '@emotion/css'
// import { useLoginForm } from '~/store/loginForm'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { FormVisibleType } from '~/components/authForm'
import api from '~/api'
import {useAuth} from '~/hooks/useAuth'
import { errorFields } from '~/helpers'

type LoginFormModel = {
  email: string
  password: string
  remember?: boolean
}

type LoginFormProps = {
  changeForm: (type: FormVisibleType) => void
}

export const LoginForm: FC<LoginFormProps> = ({changeForm}) => {
  const [FormInstance] = Form.useForm<LoginFormModel>()
  const {setSession} = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  
  async function submit (values:LoginFormModel) {
    setLoading(true)
    const { email, password, remember } = values
    try {
      const { data } = await api.auth.login({ email, password })
      data.remember = remember
      setSession(data)
    } catch (err) {
      errorFields(err, FormInstance)
    }
    setLoading(false)
  }
  
  return (
    <Wrap>
      <Spin spinning={loading}>
        <Form
          name="login"
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
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item>
            <MiddleWrap>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить</Checkbox>
              </Form.Item>

              <BtnInline type="link" onClick={() => changeForm('restore')}>
                Забыл пароль
              </BtnInline>
            </MiddleWrap>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
            Или <BtnInline type="link" onClick={() => changeForm('registration')} >зарегистрироваться!</BtnInline>
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
