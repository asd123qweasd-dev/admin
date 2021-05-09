import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Form } from 'antd'
import { rules } from '~/helpers'
import { TextEditor } from '~/components/inputs/textEditor'
import ArticleRender, { DataProp } from '~/components/articleRender';

interface TextEditorEditableProps {
  name: string
  title: string
  edit: boolean
  value?: Maybe<DataProp>|undefined
  s3Folder?: string
}

const _TextEditorEditable: FC<TextEditorEditableProps> = ({name, title, edit, value, s3Folder}) => {
  
  return (
    <TextEditorEditable>
      {edit
        ? <Form.Item name={name} rules={rules(true, `Введите ${title}`)} style={{marginBottom: '0'}}>
            <TextEditor s3Folder={s3Folder}/>
          </Form.Item>
        : <>
            { value && 
              <ArticleRender data={value} />
            }
          </>
      }
    </TextEditorEditable>
  )
}

const TextEditorEditable = styled.div`
  .ant-btn-link {
    padding-left: 0;
  }
`

export { _TextEditorEditable as TextEditorEditable }
