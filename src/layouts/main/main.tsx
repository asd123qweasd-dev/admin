import React, { FunctionComponent, useEffect, useState } from 'react'
import { AuthorizedRouters } from '~/routes'
import { BrowserRouter } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import {Trigger} from './trigger'
import { useAuth } from '~/store/auth'
import { User } from './user/'
import { Logo } from './logo'
import { Navigation } from './navigation'
import styled from '@emotion/styled'

export const Main: FunctionComponent = () => {
  const [menuRolled, setMenuRolled] = useState<boolean>(false)
  const { getMe, loading } = useAuth()

  useEffect(function () {
    getMe()
  }, [])

  return (
    <BrowserRouter>
      <Spin spinning={loading}>
        <MainLayout>
          <Sider trigger={null} collapsible collapsed={menuRolled}>
            <Logo menuRolled={menuRolled} />
            <Navigation />
          </Sider>
          <Layout className="wrap">
            <Header>
              <Trigger menuRolled={menuRolled} onClick={() => setMenuRolled(!menuRolled)}/>
              <User />
            </Header>
            <Content className="content">
              <AuthorizedRouters />
            </Content>
          </Layout>
        </MainLayout>
      </Spin>
    </BrowserRouter>
  )
}

const MainLayout = styled(Layout)`
  min-height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    :hover {
      color: #1890ff;
    }
  }
`
const Header = styled(Layout.Header)`
  background: #fff !important;
  display: flex;
  display: flex;
  justify-content: space-between;
  padding: 0;
`
const Sider = styled(Layout.Sider)``
const Content = styled(Layout.Content)`
  background: #fff;
  flex: none;
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  height: calc(100vh - 64px);
`
