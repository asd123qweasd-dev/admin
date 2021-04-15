import React, { FC } from 'react'
import styled from '@emotion/styled'
import { CreateCategoryForm } from '~/components/forms/category/createCategoryForm'

interface CreateProps { }

const _Create: FC<CreateProps> = () => {
  return (
    <Create>
      <CreateCategoryForm />
    </Create>
  )
}

const Create = styled.div``

export { _Create as Create }
