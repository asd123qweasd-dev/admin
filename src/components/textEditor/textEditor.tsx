import React, { FC, useRef } from 'react'
import styled from '@emotion/styled'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '~/lib/tools'
import { API, OutputData } from '@editorjs/editorjs';

interface TextEditorProps {
  onChange?: (data: OutputData) => void
  value?: OutputData
  id?: string
}

const _TextEditor: FC<TextEditorProps> = (props) => {
  const instanceRef = useRef({}); 
  
  async function onChange (api: API, data?: OutputData) {
    const blocks = await api.saver.save()
    props?.onChange && props?.onChange(blocks)
  }

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
