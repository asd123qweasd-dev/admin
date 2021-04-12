import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'
import { Update } from './update'

interface PermissionsProps { }
type PermissionsPage = FC<PermissionsProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
  Update: typeof Update
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
_Permissions.Update = Update

const Permissions = styled.div``

export { _Permissions as Permissions }
