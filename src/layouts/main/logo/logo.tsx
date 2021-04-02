import React, { FC } from 'react'
import styled from '@emotion/styled'
import logoImage from '~/assets/logo.svg'

interface LogoProps {
  menuRolled: boolean
}

const _Logo: FC<LogoProps> = ({menuRolled}) => {
  return (
    <Logo href="https://dnr.dev" target="_blank">
      <Img src={logoImage} alt="logo"/>
      { !menuRolled && <Text>DNR.dev</Text> }
    </Logo>
  )
}

const Logo = styled.a`
  padding: 2rem 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const Img = styled.img`
  width: 45px;
  margin-right: 4px;
`
const Text = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  line-height: 13px;
`

export { _Logo as Logo }
