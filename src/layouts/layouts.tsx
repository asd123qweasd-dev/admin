import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Auth } from '~/layouts/auth'
interface LayoutsProps { }

const _Layouts: FC<LayoutsProps> = () => {
  return (
    <Layouts>
      <Auth />
    </Layouts>
  )
}

const Layouts = styled.div``

export { _Layouts as Layouts }
