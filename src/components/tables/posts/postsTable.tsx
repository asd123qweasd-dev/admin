import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { NavLink } from 'react-router-dom'
import { formatDate } from '~/helpers/formatDate'
import { Post } from '~/api/posts'

interface PostsTableProps {
  data: Post[]|undefined
  title?: string
}

const _PostsTable: FC<PostsTableProps> = ({data, title}) => {
  const columns:ColumnsType<Post> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (value) => <NavLink to={`/posts/${value}`} style={{padding: '10px 25px'}}>{value}</NavLink>
    },
    {
      title: 'Статус',
      dataIndex: 'published_at',
      key: 'published_at',
      render: (value, row) => {
        return (<>
          { row.deleted_at 
            ? <Tag color={value ? 'success' : 'orange'}>{ value ? 'Опубликован' : 'Неопубликован' }</Tag>
            : <Tag color="error">Удален</Tag>
          }
        </>)
      }
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug'
    },
    {
      title: 'source_url',
      dataIndex: 'source_url',
      key: 'source_url',
      render: (value) => value ? <a href={value} target="_blank" rel="noreferrer">{value}</a> : 'нет'
    },
    // {
    //   title: 'Удалено',
    //   dataIndex: 'deleted_at',
    //   key: 'deleted_at',
    //   render: (value) => formatDate(value)
    // }
  
  ]
  return (
    <PostsTable>
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
    </PostsTable>
  )
}

const PostsTable = styled.div``
const Title = styled(Typography.Title)``

export { _PostsTable as PostsTable }
