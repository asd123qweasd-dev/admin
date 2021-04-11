import React, { FC } from 'react'
import styled from '@emotion/styled'
import { UserUpdate } from '~/components/forms/userUpdate'
import { useParams } from 'react-router'

interface UpdateProps { }

const _Update: FC<UpdateProps> = () => {
  const { id }: any = useParams()

  return (
    <Update>
      <UserUpdate id={id} />
    </Update>
  )
}

const Update = styled.div``

export { _Update as Update }
