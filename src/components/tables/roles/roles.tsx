import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom'

interface RolesProps {
  data: any[]|undefined
  title?: string
}

const _Roles: FC<RolesProps> = ({data, title}) => {
  const columns:ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (value) => <NavLink to={`/roles/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Права',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (values) => values.map((item:any) => {
        return <Tag color="blue" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
      })
    }
  
  ]
  return (
    <Roles>
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
    </Roles>
  )
}

const Roles = styled.div``
const Title = styled(Typography.Title)``

export { _Roles as Roles }
