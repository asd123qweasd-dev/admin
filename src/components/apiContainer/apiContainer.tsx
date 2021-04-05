import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from "~/lib/axios";
import { ApiPagination } from '~/api';
import { Pagination, Spin } from 'antd';

interface ApiContainerProps {
  url: string
}

const _ApiContainer: FC<PropsWithChildren<ApiContainerProps>> = ({ children, url: propsUrl }) => {
  const [response, setResponse] = useState<ApiPagination<any>>()
  const [url, setUrl] = useState(propsUrl)
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    getData()
  }, [url])
  
  const hasPagination = () => Boolean(response?.hasOwnProperty('data') && response?.hasOwnProperty('meta'))
  console.log(hasPagination())

  async function getData() {
    setLoading(true)
    try {
      const { data }: any = await axios({ url, method: 'get' })
      setResponse(data)
    } catch (err) { }
    setLoading(false)
  }

  function paginationChange(page: number, pageSize?: number) {
    setUrl(String(response?.meta?.links[page]?.url || 0))
  }

  return (
    <ApiContainer>
      <Spin spinning={loading}>
        { //@ts-ignore
          children(hasPagination() ? response.data : response)
        }
        { hasPagination() &&
          <PaginationWrap>
            <Pagination
              current={response?.meta?.current_page}
              total={response?.meta?.total}
              pageSize={response?.meta?.per_page || 0}
              onChange={paginationChange}
              />
          </PaginationWrap>
        }
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
