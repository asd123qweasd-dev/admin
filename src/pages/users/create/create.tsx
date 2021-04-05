import React, { FC } from 'react'
import styled from '@emotion/styled'
import {User as UserForm} from '~/components/forms/user'

interface CreateProps {}

const _Create: FC<CreateProps> = () => {
  return (
    <Create>
      <UserForm />
    </Create>
  )
}

const Create = styled.div``

export { _Create as Create }
