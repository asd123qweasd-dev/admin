import React, { FC } from 'react'
import styled from '@emotion/styled'
import { CreateRoleForm } from '~/components/forms/roles/createRoleForm'

interface CreateProps { }

const _Create: FC<CreateProps> = () => {
  return (
    <Create>
      <CreateRoleForm />
    </Create>
  )
}

const Create = styled.div``

export { _Create as Create }
