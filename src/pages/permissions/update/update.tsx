import React, { FC } from 'react'
import styled from '@emotion/styled'
import { UpdatePermissionsForm } from '~/components/forms/permissions/updatePermissionsForm'
import { useParams } from 'react-router'

interface UpdateProps { }

const _Update: FC<UpdateProps> = () => {
  const { id }: any = useParams()

  return (
    <Update>
      <UpdatePermissionsForm id={id} />
    </Update>
  )
}

const Update = styled.div``

export { _Update as Update }
