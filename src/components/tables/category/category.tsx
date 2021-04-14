import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom'
import { formatDate } from '~/helpers/formatDate'

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
      render: (value) => <NavLink to={`/category/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Активна',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value) => <Tag color={value ? 'success' : 'error'}>{ value ? 'Активна' : 'Неактивная' }</Tag>
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug'
    },
    {
      title: 'Parent Id',
      dataIndex: 'parent_id',
      key: 'parent_id',
      render: (value) => value ? <NavLink to={`/category/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink> : 'нет'
    },
    {
      title: '(SEO)Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '(SEO)Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '(SEO)keywords',
      dataIndex: 'keywords',
      key: 'keywords'
    },
    {
      title: 'Создано',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => formatDate(value)
    },
    {
      title: 'Обновлено',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (value) => formatDate(value)
    },
    {
      title: 'Удалено',
      dataIndex: 'deleted_at',
      key: 'deleted_at',
      render: (value) => formatDate(value)
    }
  
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
