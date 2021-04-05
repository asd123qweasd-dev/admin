import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom'

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
      render: (value) => <NavLink to={`/users/${value}`}>{value}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
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
      render: (value) => value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
    },
    {
      title: 'Изображение',
      dataIndex: 'images',
      key: 'images',
    },
    {
      title: 'Создан',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
    },
    {
      title: 'Обновлен',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (value) => value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
    },
    {
      title: 'Удален',
      dataIndex: 'deleted_at',
      key: 'deleted_at',
      render: (value) => value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
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
