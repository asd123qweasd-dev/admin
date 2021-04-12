import React, { FC } from 'react'
import styled from '@emotion/styled'
import { UserCreate } from '~/components/forms/userCreate'

interface CreateProps { }

const _Create: FC<CreateProps> = () => {
  return (
    <Create>
      <UserCreate />
    </Create>
  )
}

const Create = styled.div``

export { _Create as Create }
