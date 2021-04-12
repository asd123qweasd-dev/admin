import React, { FC } from 'react'
import styled from '@emotion/styled'
import { AuthForm } from '~/components/authForm'

interface LoginProps { }

const _Login: FC<LoginProps> = () => {
  return (
    <Login>
      <AuthForm />
    </Login>
  )
}

const Login = styled.div``

export { _Login as Login }
