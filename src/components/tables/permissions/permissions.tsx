import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { NavLink } from 'react-router-dom'

interface PermissionsProps {
  data: any[]|undefined
  title?: string
}

const _Permissions: FC<PermissionsProps> = ({data, title}) => {
  const columns:ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (value) => <NavLink to={`/permissions/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Право',
      dataIndex: 'name',
      key: 'name',
      render: (value) => <Tag color="processing">{ value }</Tag>
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      key: 'roles',
      render: (values) => values.map((item:any) => {
        return <Tag color="orange" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
      })
    }
  
  ]
  return (
    <Permissions>
      { title && 
        <Title level={4}>{title}</Title>
      }
      <Table
        dataSource={data} 
        columns={columns}
        pagination={false}
        rowKey="id"
        scroll={{
          x: true,
          scrollToFirstRowOnChange: true
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}
          };
        }}
      />
    </Permissions>
  )
}

const Permissions = styled.div``
const Title = styled(Typography.Title)``

export { _Permissions as Permissions }
