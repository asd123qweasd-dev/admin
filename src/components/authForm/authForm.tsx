import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { LoginForm } from '~/components/forms/login'
import { RegistrationForm } from '~/components/forms/registration'
import { RestoreForm } from '~/components/forms/resore'
import { FormVisibleType } from '.'

interface AuthFormProps {}

const _AuthForm: FC<AuthFormProps> = () => {
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
    <AuthForm>
      { form() }
    </AuthForm>
  )
}

const AuthForm = styled.div``

export { _AuthForm as AuthForm }
