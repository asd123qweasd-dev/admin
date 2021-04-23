import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Form, Input } from 'antd'
import { rules } from '~/helpers'

interface InputEditableProps {
  name: string
  title: string
  edit: boolean
  value?: Maybe<string>|undefined
}

const _InputEditable: FC<InputEditableProps> = ({name, edit, title, value}) => {
  return (
    <InputEditable>
      { edit
        ? <Form.Item name={name} rules={rules(true, `Введите ${title}`)}>
            <Input placeholder={title} />
          </Form.Item>
        : <span>{value || ''}</span>
      }
    </InputEditable>
  )
}

const InputEditable = styled.div`
  .ant-form-item {
    margin-bottom: 0;
  }
`

export { _InputEditable as InputEditable }
