import { FC } from 'react'
import styled from '@emotion/styled'
import { LoginForm } from '~/form/login'

interface LoginProps { }

const _Login: FC<LoginProps> = () => {
  return (
    <Login>
      <LoginForm />
    </Login>
  )
}

const Login = styled.div``

export { _Login as Login }
