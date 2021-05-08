import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'

interface S3Props { }
type S3Page = FC<S3Props> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
}

const _S3: S3Page = () => {
  return (
    <S3>
      <GetAll />
    </S3>
  )
}

_S3.GetAll = GetAll
_S3.GetOne = GetOne
_S3.Create = Create

const S3 = styled.div``

export { _S3 as S3 }
