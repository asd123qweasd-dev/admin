import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import { Login } from '~/pages/login'

interface AuthProps {}

const _Auth: FC<AuthProps> = () => {
  return (
    <Layout className="authentication">
      <Layout.Content>
        <Login />
      </Layout.Content>
    </Layout>
  )
}

const Auth = styled.div``

export { _Auth as Auth }
