import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { useGetUsers } from '~/hooks/useGetUsers'
import { Button, Select, Spin, Tag } from 'antd'
import { useGetRole } from '~/hooks/useGetRole'
import { css } from '@emotion/css'
import api from '~/api'
import {mutate} from 'swr'

interface UserRolesUpdateProps {
  userId: string
  edit: boolean
}

const _UserRolesUpdate: FC<UserRolesUpdateProps> = ({userId, edit}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const user = useGetUsers(Number(userId))
  const roles = useGetRole()

  
  async function changeRoles(roleId: number) {
    setLoading(true)
    try {
      const {data} = await api.roles.assign(String(roleId), userId)
      mutate(`/users/${userId}`, {...data })
    }catch(err){}
    setLoading(false)
  }

  return (
    <UserRolesUpdate>
      <Spin spinning={loading}>
        {user.data?.roles &&
          <>
            {edit
              ? <Select 
                  mode="tags" 
                  className={selectRoles} 
                  defaultValue={user.data?.roles.map(item => (item.id))} 
                  placeholder="Роли" 
                  onSelect={changeRoles}
                  onDeselect={changeRoles}
                >
                  {roles?.data?.map(item => {
                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                  })}
                </Select>
              : <div>
                  {user.data?.roles?.map(item => {
                    return <Tag color="orange" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
                  })}
                </div>
            }
          </>
        }
      </Spin>
    </UserRolesUpdate>
  )
}

const UserRolesUpdate = styled.div``
const selectRoles = css`&&{
  width: 100%;
  margin-bottom: 5px;
  .ant-select-selection-item{
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
  .anticon.anticon-close {
    color: #d46b08;
  }
}
`
export { _UserRolesUpdate as UserRolesUpdate }
