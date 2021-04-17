import React, { FC } from 'react'
import styled from '@emotion/styled'
import { GetOne } from './getOne'
import { GetAll } from './getAll'
import { Create } from './create'
import { Update } from './update'

interface PostsProps { }
type PostsPage = FC<PostsProps> & {
  GetAll: typeof GetAll
  GetOne: typeof GetOne
  Create: typeof Create
  Update: typeof Update
}

const _Posts: PostsPage = () => {
  return (
    <Posts>
      <GetAll />
    </Posts>
  )
}

_Posts.GetAll = GetAll
_Posts.GetOne = GetOne
_Posts.Create = Create
_Posts.Update = Update

const Posts = styled.div``

export { _Posts as Posts }
