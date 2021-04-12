import React, { FC } from 'react'
import styled from '@emotion/styled'
import { UpdateRoleForm } from '~/components/forms/roles/updateRoleForm'
import { useParams } from 'react-router'

interface UpdateProps { }

const _Update: FC<UpdateProps> = () => {
  const { id }: any = useParams()

  return (
    <Update>
      <UpdateRoleForm id={id} />
    </Update>
  )
}

const Update = styled.div``

export { _Update as Update }
