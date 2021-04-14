import React, { FC } from 'react'
import styled from '@emotion/styled'
import { UpdateCategoryForm } from '~/components/forms/category/updateCategoryForm'
import { useParams } from 'react-router'

interface UpdateProps { }

const _Update: FC<UpdateProps> = () => {
  const { id }: any = useParams()

  return (
    <Update>
      <UpdateCategoryForm id={id} />
    </Update>
  )
}

const Update = styled.div``

export { _Update as Update }
