import React, { FC } from 'react'
import styled from '@emotion/styled'
import { CreatePermissionsForm } from '~/components/forms/permissions/createPermissionsForm'

interface CreateProps { }

const _Create: FC<CreateProps> = () => {
  return (
    <Create>
      <CreatePermissionsForm />
    </Create>
  )
}

const Create = styled.div``

export { _Create as Create }
