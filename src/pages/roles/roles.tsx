import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'

interface RolesProps { }
type RolesPage = FC<RolesProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
}

const _Roles: RolesPage = () => {
  return (
    <Roles>
      <GetAll />
    </Roles>
  )
}

_Roles.GetAll = GetAll
_Roles.GetOne = GetOne
_Roles.Create = Create

const Roles = styled.div``

export { _Roles as Roles }
