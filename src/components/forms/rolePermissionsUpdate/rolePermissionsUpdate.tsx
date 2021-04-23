import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Select, Spin, Tag } from 'antd'
import { useGetRole } from '~/hooks/useGetRole'
import { css } from '@emotion/css'
import api from '~/api'
import {mutate} from 'swr'
import { useGetPermissions } from '~/hooks/useGetPermissions'

interface RolePermissionsUpdateProps {
  roleId: string
  edit: boolean
}

const _RolePermissionsUpdate: FC<RolePermissionsUpdateProps> = ({roleId, edit}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const role = useGetRole(roleId)
  const permissions = useGetPermissions()

  
  async function changeRoles(permissionId: number) {
    setLoading(true)
    try {
      const {data} = await api.permissions.assign(String(permissionId), String(roleId))
      mutate(`/roles/${roleId}`, {...data })
    }catch(err){}
    setLoading(false)
  }

  return (
    <RolePermissionsUpdate>
      <Spin spinning={loading}>
        {role.data?.permissions &&
          <>
            {edit
              ? <Select 
                  mode="tags" 
                  className={selectRoles} 
                  defaultValue={role.data?.permissions.map(item => (item.id))} 
                  placeholder="Роли" 
                  onSelect={changeRoles}
                  onDeselect={changeRoles}
                >
                  {permissions?.data?.map(item => {
                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                  })}
                </Select>
              : <div>
                  {role.data?.permissions?.map(item => {
                    return <Tag color="blue" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
                  })}
                </div>
            }
          </>
        }
      </Spin>
    </RolePermissionsUpdate>
  )
}

const RolePermissionsUpdate = styled.div``
const selectRoles = css`&&{
  width: 100%;
  margin-bottom: 5px;
  .ant-select-selection-item{
    color: #096dd9;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
  .anticon.anticon-close {
    color: #096dd9;
  }
}
`
export { _RolePermissionsUpdate as RolePermissionsUpdate }
