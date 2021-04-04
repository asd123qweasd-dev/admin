import React, { FC, useState, useEffect } from 'react'
import { layout, tailLayout, } from './style'
import { Form, Input, Button, Spin, notification, Switch } from 'antd'

interface CategoryFormProps {
  modalProps?: {
    [key: string]: any
  }
}

interface CategoryFormData {
  parent_id: string
  slug: string
  name: string
  title?: string
  description?: string
  keywords?: string
  is_active: boolean
}

export const CategoryForm: FC<CategoryFormProps> = () => {
  const [FormInstance] = Form.useForm<CategoryFormData>()
  const [formLoader, setFormLoader] = useState<boolean>(false)

  useEffect(function () {
    FormInstance.setFieldsValue({
      // is_active: true
    })
  }, [])



  async function onFinish(value: CategoryFormData) {
    try {
      setFormLoader(true)
      notification.success({
        message: 'Success'
      })
    }catch(err) {}
    setFormLoader(false)
  }

  return (
    <Spin spinning={formLoader}>
      <Form
        form={FormInstance}
        name="basic"
        initialValues={{is_active: false}}
        // onValuesChange={onFinish}
        autoComplete="off"
        onFinish={onFinish}
        {...layout}
      >
        <Form.Item
          label="parent_id"
          name="parent_id"
          rules={[{ required: true, message: 'Please input your parent_id!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="slug"
          name="slug"
          rules={[{ required: true, message: 'Please input your slug!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="keywords"
          name="keywords"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="is_active"
          name="is_active"
          valuePropName="checked"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Switch />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
