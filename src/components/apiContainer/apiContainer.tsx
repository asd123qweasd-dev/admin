import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from "~/lib/axios";
import { Pagination, Spin } from 'antd';
import useSWR from 'swr'
import {pageScrollUp} from '~/helpers/pageScrollUp'

interface ApiContainerProps {
  url: string
}
const fetcher = (url:string) => axios.get(url).then(res => res.data)

const _ApiContainer: FC<PropsWithChildren<ApiContainerProps>> = ({ children, url: propsUrl }) => {
  const [softData, setSoftData] = useState<any>()
  const [url, setUrl] = useState(propsUrl)
  const { data, error } = useSWR(url, fetcher)

  useEffect(function () {
    if (!data) return
    setSoftData(data)
  }, [data])
  
  const hasPagination = () => Boolean(softData?.hasOwnProperty('data') && softData?.hasOwnProperty('meta'))

  function paginationChange(page: number, pageSize?: number) {
    pageScrollUp()
    setUrl(String(softData?.meta?.links[page]?.url || 0))
  }

  return (
    <ApiContainer>
      <Spin spinning={(!data && !error)}>
        { //@ts-ignore
          children(hasPagination() ? softData.data : softData)
        }
        { hasPagination() &&
          <PaginationWrap>
            <Pagination
              current={softData?.meta?.current_page}
              total={softData?.meta?.total}
              pageSize={softData?.meta?.per_page || 0}
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
