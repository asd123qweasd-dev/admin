import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'

interface PermissionsProps { }
type PermissionsPage = FC<PermissionsProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
}

const _Permissions: PermissionsPage = () => {
  return (
    <Permissions>
      <GetAll />
    </Permissions>
  )
}

_Permissions.GetAll = GetAll
_Permissions.GetOne = GetOne
_Permissions.Create = Create

const Permissions = styled.div``

export { _Permissions as Permissions }
