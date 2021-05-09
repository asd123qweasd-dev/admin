import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Form, Image } from 'antd'
import { rules } from '~/helpers'
import { InputImage } from '~/components/inputs/inputImage'
import { S3_STORAGE_URL } from '~/config'

interface InputImageEditableProps {
  name: string
  title: string
  edit: boolean
  value?: Maybe<string>
}

const _InputImageEditable: FC<InputImageEditableProps> = ({name, title, edit, value}) => {

  return (
    <InputImageEditable>
      {edit
        ? <Form.Item name="image" rules={rules(true, `Введите ${title}`)} style={{marginBottom: '0'}}>
            <InputImage />
          </Form.Item>
        : <Image src={value? `${S3_STORAGE_URL}${value}` : undefined} style={{maxWidth: '350px'}}/>
      }
    </InputImageEditable>
  )
}

const InputImageEditable = styled.div`
  .ant-btn-link {
    padding-left: 0;
  }
`

export { _InputImageEditable as InputImageEditable }
