import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from "~/lib/axios";
import { ApiPagination } from '~/api';
import { Pagination, Spin } from 'antd';
import { defaultResponse } from './data'

interface ApiContainerProps {
  url: string
}

const _ApiContainer: FC<PropsWithChildren<ApiContainerProps>> = ({ children, url: propsUrl }) => {
  const [response, setResponse] = useState<ApiPagination<any>>(defaultResponse)
  const [url, setUrl] = useState(propsUrl)
  const [loading, setLoading] = useState(false)

  const { data, meta: {
    current_page,
    per_page,
    total,
    links
  }} = response

  useEffect(function () {
    getData()
  }, [url])

  async function getData() {
    setLoading(true)
    try {
      const { data }: any = await axios({ url, method: 'get' })
      setResponse(data)
    } catch (err) { }
    setLoading(false)
  }

  function paginationChange(page: number, pageSize?: number) {
    setUrl(String(links[page].url))
  }

  return (
    <ApiContainer>
      <Spin spinning={loading}>
        { //@ts-ignore
          children(data)
        }
        <PaginationWrap>
          <Pagination
            current={current_page}
            total={total}
            pageSize={per_page || 0}
            onChange={paginationChange}
            />
        </PaginationWrap>
      </Spin>
    </ApiContainer>
  )
}

const ApiContainer = styled.div``
const PaginationWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
`

export { _ApiContainer as ApiContainer }
