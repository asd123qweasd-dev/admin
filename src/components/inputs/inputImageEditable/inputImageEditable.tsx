import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Form, Image } from 'antd'
import { rules } from '~/helpers'
import ArticleRender, { DataProp } from '~/components/articleRender';
import { PostImage } from '~/api/posts'
import { InputImage } from '~/components/inputs/inputImage'

interface InputImageEditableProps {
  name: string
  title: string
  edit: boolean
  value?: Maybe<PostImage[]>|undefined
}

const _InputImageEditable: FC<InputImageEditableProps> = ({name, title, edit, value}) => {

  return (
    <InputImageEditable>
      {edit
        ? <Form.Item name="image" rules={rules(true, `Введите ${title}`)} style={{marginBottom: '0'}}>
            <InputImage data={value}/>
          </Form.Item>
        : <>
            { value &&
              value.map(item => {
                return <Image src={item.original} style={{maxWidth: '350px'}}/>
              })
            }
          </>
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
