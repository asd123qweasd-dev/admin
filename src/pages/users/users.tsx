import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'

interface UsersProps { }
type UserPage = FC<UsersProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
}

const _Users: UserPage = () => {
  return (
    <Users>
      <GetAll />
    </Users>
  )
}

_Users.GetAll = GetAll
_Users.GetOne = GetOne
_Users.Create = Create

const Users = styled.div``

export { _Users as Users }
