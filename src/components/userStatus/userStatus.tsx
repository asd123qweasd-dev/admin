import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Tag } from 'antd'

interface UserStatusProps {
  deleted: string|null|undefined
  verified: string|null|undefined
}

const _UserStatus: FC<UserStatusProps> = ({deleted, verified}) => {
  return (
    <UserStatus>
      { deleted 
        ? <Tag color="error">Удален</Tag>
        : <>
            <Tag color={verified ? 'success' : 'orange'}>{ verified ? 'Подтвержден' : 'Неподтвержден' }</Tag>
            {/* <Button type="link" onClick={changeStatus}>Сменить</Button> */}
          </>
      }
    </UserStatus>
  )
}

const UserStatus = styled.div``

export { _UserStatus as UserStatus }
