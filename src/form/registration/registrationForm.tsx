import React, { FC } from 'react'
import { Input, Form, Button, Spin, Checkbox } from 'antd'
import { css } from '@emotion/css'
import { LoginFormData } from '~/store/loginForm/slice'
import { useLoginForm } from '~/store/loginForm'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { FormVisibleType } from '~/pages/login/login'

type RegistrationProps = {
  changeForm: (type: FormVisibleType) => void
}

export const RegistrationForm: FC<RegistrationProps> = ({changeForm}) => {
  const loginForm = useLoginForm()
  const [FormInstance] = Form.useForm<LoginFormData>()

  return (
    <Wrap>
      <Spin spinning={loginForm.loading}>
        <Form
          name="registration"
          fields={loginForm.form}
          form={FormInstance}
          onFinish={loginForm.submit}
          onFieldsChange={(changedFields, allFields) => {
            loginForm.changeForm(allFields)
          }}
          className={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя" />
          </Form.Item>
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
          <Form.Item
            name="password_confirmation"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль еще раз"
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
              зарегистрироваться
            </Button>
            Или <BtnInline type="link" onClick={() => changeForm('login')}>войти!</BtnInline>
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
