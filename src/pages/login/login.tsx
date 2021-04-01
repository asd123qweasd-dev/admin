import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { LoginForm } from '~/form/login'
import { RegistrationForm } from '~/form/registration'
import { RestoreForm } from '~/form/resore'

interface LoginProps { }
export type FormVisibleType = 'login' | 'registration' | 'restore'

const _Login: FC<LoginProps> = () => {
  const [formVisible, setFormVisible] = useState<FormVisibleType>('login')

  function form() {
    switch (formVisible) {
      case 'login':
        return <LoginForm changeForm={setFormVisible}/>
      case 'registration':
        return <RegistrationForm changeForm={setFormVisible}/>
      case 'restore':
        return <RestoreForm changeForm={setFormVisible}/>
      default:
        return <LoginForm changeForm={setFormVisible}/>
    }
  }
  return (
    <Login>
      { form() }
    </Login>
  )
}

const Login = styled.div``

export { _Login as Login }
