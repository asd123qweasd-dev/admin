import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'

interface CategoryProps { }
type CategoryPage = FC<CategoryProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
}

const _Category: CategoryPage = () => {
  return (
    <Category>
      <GetAll />
    </Category>
  )
}

_Category.GetAll = GetAll
_Category.GetOne = GetOne
_Category.Create = Create

const Category = styled.div``

export { _Category as Category }
