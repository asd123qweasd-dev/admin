import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetAll } from './getAll'

interface S3Props { }
type S3Page = FC<S3Props> & {
  GetAll: typeof GetAll
}

const _S3: S3Page = () => {
  return (
    <S3>
      <GetAll />
    </S3>
  )
}

_S3.GetAll = GetAll

const S3 = styled.div``

export { _S3 as S3 }
