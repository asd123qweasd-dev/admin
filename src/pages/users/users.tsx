import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Users as UsersTables } from '~/components/tables/users'
import { ApiContainer } from '~/components/apiContainer'

interface UsersProps { }

const _Users: FC<UsersProps> = () => {

  return (
    <Users>
      <ApiContainer url="/users">
        {(data: any) => (
          <UsersTables title="Users" data={data} />
        )}
      </ApiContainer>
    </Users>
  )
}

const Users = styled.div``

export { _Users as Users }
