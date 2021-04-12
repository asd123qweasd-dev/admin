import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'
import { Update } from './update'

interface UsersProps { }
type UserPage = FC<UsersProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
  Update: typeof Update
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
_Users.Update = Update

const Users = styled.div``

export { _Users as Users }
