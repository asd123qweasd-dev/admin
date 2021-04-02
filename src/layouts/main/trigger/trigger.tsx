import React, { FC } from 'react'
import styled from '@emotion/styled'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

interface TriggerProps {
  menuRolled: boolean
  onClick: () => void
}

const _Trigger: FC<TriggerProps> = ({ menuRolled, onClick }) => {

  return (
    <Trigger onClick={onClick} className="trigger">
      { menuRolled ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
    </Trigger>
  )
}

const Trigger = styled.div``

export { _Trigger as Trigger }
