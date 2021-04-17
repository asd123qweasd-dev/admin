import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { NavLink } from 'react-router-dom'
import { CategoryStatus } from '~/components/categoryStatus'

interface CategoryProps {
  data: any[]|undefined
  title?: string
}

const _Category: FC<CategoryProps> = ({data, title}) => {
  const columns:ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (value) => <NavLink to={`/categories/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Статус',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value, row) => <CategoryStatus id={Number(row.id)} />
    },
    {
      title: 'Parent Id',
      dataIndex: 'parent_id',
      key: 'parent_id',
      render: (value) => value ? <NavLink to={`/categories/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink> : 'нет'
    },
  ]
  return (
    <Category>
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
    </Category>
  )
}

const Category = styled.div``
const Title = styled(Typography.Title)``

export { _Category as Category }
