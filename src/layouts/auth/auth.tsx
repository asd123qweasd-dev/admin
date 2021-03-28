import React, { FC } from 'react'
import { Layout } from 'antd'
import { Login } from '~/pages/login'
import styled from '@emotion/styled'

interface AuthProps {}

const _Auth: FC<AuthProps> = () => {
  return (
    <Layout>
      <Content>
        <Login />
      </Content>
    </Layout>
  )
}

const Content = styled(Layout.Content)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
`

export { _Auth as Auth }
