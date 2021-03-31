import React, { FC } from 'react'
import { Input, Form, Button, Spin } from 'antd'
import { css } from '@emotion/css'
import { AuthLoginForm } from '~/store/auth'
import { useLoginForm } from '~/store/loginForm'

export const LoginForm: FC = () => {
  const loginForm = useLoginForm()
  const [FormInstance] = Form.useForm<AuthLoginForm>()

  return (
    <Spin spinning={loginForm.loading}>
      <Form
        {...layout}
        name="login"
        initialValues={loginForm.form}
        form={FormInstance}
        onFinish={loginForm.submit}
        onValuesChange={loginForm.changeForm}
        className={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Пожалуйста заполните поле Email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста заполните поле Пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
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
