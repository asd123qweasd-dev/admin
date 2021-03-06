import React, { FC, useRef } from 'react'
import styled from '@emotion/styled'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '~/lib/editorjs/tools'
import { API, OutputData } from '@editorjs/editorjs';
import api from '~/api';

interface TextEditorProps {
  onChange?: (data: OutputData) => void
  value?: OutputData
  id?: string
  s3Folder?: string
}

const _TextEditor: FC<TextEditorProps> = (props) => {
  const instanceRef = useRef({}); 
  
  async function onChange (api: API, data?: OutputData) {
    const blocks = await api.saver.save()
    props?.onChange && props?.onChange(blocks)
  }
  function uploadByFile(file:any, ) {
    return api.s3.upload(file, props.s3Folder).then((res) => {
      return {
        success: 1,
        file: {
          url: res.data.Location
        }
      }
    })
  }
  
  function uploadByUrl(url:string) {
    return api.s3.upload(url, props.s3Folder).then((res) => {
      return {
        success: 1,
        file: {
          url: res.data.Location,
        }
      }
    })
  }

  EDITOR_JS_TOOLS.image.config.uploader.uploadByFile = uploadByFile
  EDITOR_JS_TOOLS.image.config.uploader.uploadByFile = uploadByUrl

  return (
    <TextEditor>
      <EditorJs 
        data={props.value || undefined}
        onChange={onChange}
        tools={EDITOR_JS_TOOLS} 
        instanceRef={(instance) => (instanceRef.current = instance)}
      />
    </TextEditor>
  )
}

const TextEditor = styled.div``

export { _TextEditor as TextEditor }
