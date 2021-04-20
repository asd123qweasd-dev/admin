import { Button, Form } from 'antd';
import React, { FunctionComponent, useRef } from 'react'
import { TextEditor } from '~/components/textEditor';


export const Home: FunctionComponent = () => {
  const [FormInstance] = Form.useForm()

  async function submit (e:any) {
    console.log(e);
  }
  
  return (
    <div>
      <Form
          name="login11"
          form={FormInstance}
          onFinish={submit}
        >
          <Form.Item
            name="email"
            rules={[{ required: false, message: 'Введите email' }]}
          >
            <TextEditor />
          </Form.Item>
          <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  )
}
