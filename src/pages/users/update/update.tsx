import React, { FC } from 'react'
import styled from '@emotion/styled'
import { User as UserForm } from '~/components/forms/user'
import { useParams } from 'react-router'

interface UpdateProps { }

const _Update: FC<UpdateProps> = () => {
  const { id }: any = useParams()

  return (
    <Update>
      <UserForm id={Number(id)} />
    </Update>
  )
}

const Update = styled.div``

export { _Update as Update }
