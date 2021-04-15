import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { NavLink } from 'react-router-dom'
import { formatDate } from '~/helpers/formatDate'

interface UsersProps {
  data: any[]|undefined
  title?: string
}

const _Users: FC<UsersProps> = ({data, title}) => {
  const columns:ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (value) => <NavLink to={`/users/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      key: 'roles',
      render: (values) => values.map((item:any) => {
        return <Tag color="orange" key={item.id} style={{marginBottom: '5px'}}>{ item.name }</Tag>
      })
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Подтвержден',
      dataIndex: 'email_verified_at',
      key: 'email_verified_at',
      render: (value) => formatDate(value)
    },
    {
      title: 'Создан',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => formatDate(value)
    },
    {
      title: 'Обновлен',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (value) => formatDate(value)
    },
    {
      title: 'Удален',
      dataIndex: 'deleted_at',
      key: 'deleted_at',
      render: (value) => formatDate(value)
    }
  ]
  return (
    <Users>
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
    </Users>
  )
}

const Users = styled.div``
const Title = styled(Typography.Title)``

export { _Users as Users }
