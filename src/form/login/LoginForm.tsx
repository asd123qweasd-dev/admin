import React, { FC, useState } from 'react'
import { Input, Form, Button, notification, Spin } from 'antd'
import { css } from '@emotion/css'

interface LoginFormData {
  email: string
  password: string
}

export const LoginForm: FC = () => {
  const [FormInstance] = Form.useForm<LoginFormData>()
  const [formLoader, setFormLoader] = useState<boolean>(false)

  const onFinish = async (values: LoginFormData) => {
    const { password, email } = values
    console.log(values);
    
    try {
      setFormLoader(true)
      notification.success({
        message: 'Success'
      })
    } catch (err) {}
    setFormLoader(false)
  }

  return (
    <Spin spinning={formLoader}>
      <Form
        {...layout}
        name="login"
        form={FormInstance}
        onFinish={onFinish}
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
