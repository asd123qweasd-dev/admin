import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Auth } from '~/layouts/auth'
import { Main } from '~/layouts/main'
import { useAuth } from '~/store/auth'

interface LayoutsProps { }

const _Layouts: FC<LayoutsProps> = () => {
  const { isAuth } = useAuth()

  return (
    <Layouts>
      { isAuth ? <Main /> : <Auth />}
    </Layouts>
  )
}

const Layouts = styled.div``

export { _Layouts as Layouts }
