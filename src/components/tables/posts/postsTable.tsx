import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { NavLink } from 'react-router-dom'
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
            ? <Tag color="error">Удален</Tag>
            : <Tag color={value ? 'success' : 'orange'}>{ value ? 'Опубликован' : 'Неопубликован' }</Tag>
          }
        </>)
      }
    },
    {
      title: 'Автор',
      dataIndex: 'author_id',
      key: 'author_id',
      render: (authorId, row) => authorId && <NavLink to={`/users/${authorId}`}>{row.author?.name}</NavLink>
    },
    {
      title: 'Категория',
      dataIndex: 'category_id',
      key: 'category_id',
      // render: (value) => value ? <a href={value} target="_blank" rel="noreferrer">{value}</a> : 'нет'
      render: (categoryId, row) => categoryId && <NavLink to={`/categories/${categoryId}`}>{row.category?.name}</NavLink>
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name'
    }
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
