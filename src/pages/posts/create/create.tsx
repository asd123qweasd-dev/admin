import React, { FC } from 'react'
import styled from '@emotion/styled'
import {СreatePostForm} from '~/components/forms/createPostForm'

interface CreateProps { }

const _Create: FC<CreateProps> = () => {
  return (
    <Create>
      <СreatePostForm />
    </Create>
  )
}

const Create = styled.div``

export { _Create as Create }
