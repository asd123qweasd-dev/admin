import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { List, Image, Breadcrumb } from 'antd'
import folderImg from '~/assets/folder.svg'
import { css } from '@emotion/css'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { S3 } from '~/types/s3'

export type BreadcrumbData = {
  name: string
  path: string
}

interface S3ViewProps {
  data: S3|undefined
  error: boolean
}

const _S3View: FC<S3ViewProps> = ({data, error}) => {
  const history = useHistory()
  const [softData, setSoftData] = useState<S3|undefined>()

  useEffect(function () {
    if (!data) return
    setSoftData(data)
  }, [data])
  console.log(data);

  function getFolderName (name:string) {
    return name.slice(0, -1).replace(data?.Prefix || '', '')
  }
  function getFileName (name:string) {
    return name.replace(data?.Prefix || '', '')
  }

  function getBreadcrumbData () {
    // удаляем приставку /s3/ или /s3
    let routeData = history.location.pathname.replace(/^\/s3\/|\/s3/, '')
    // удаляем последний символ - если он обратный слеш
    routeData = routeData.replace(/\/$/, '')
    const result:BreadcrumbData[] = []
    // создаем массив имен и путей роутера
    routeData.split('/').forEach(item => {
      function getPathName () {
        const lastPath = [...result].reverse()[0]?.path || '/s3'
        return `${lastPath}/${item}`
      }
      const data = {name: item, path: getPathName()}
      result.push(data)
    })
    return result
  }

  return (
    <S3View>
      <Breadcrumb style={{margin: '0 0 10px 10px'}}>
        <Breadcrumb.Item><Link to="/s3">dnr-dev</Link></Breadcrumb.Item>
        { getBreadcrumbData().map((item, key) => {
          return <Breadcrumb.Item><Link to={item.path} key={key}>{item.name}</Link></Breadcrumb.Item>
        })}
      </Breadcrumb>
      {Boolean(softData?.CommonPrefixes.length) &&
        <List
          loading={!data && !error}
          dataSource={softData?.CommonPrefixes}
          renderItem={item => (
            <List.Item className={listItem} onClick={() => history.push(`/s3/${item.Prefix}`)}>
              <ItemWrap>
                <FolderImg src={folderImg}/> <ItemName>{getFolderName(item.Prefix)}</ItemName>
              </ItemWrap>
            </List.Item>
          )}
        />
      }
      {Boolean(softData?.Contents.length) &&
        <List
          loading={!data && !error}
          dataSource={softData?.Contents}
          renderItem={item => (
            <List.Item className={listItem}>
              <ItemWrap>
                <Image src={`https://storage.yandexcloud.net/dnr-dev/${item.Key}`} width={100} height={56} style={{objectFit: 'cover'}}/> <ItemName>{getFileName(item.Key)}</ItemName>
              </ItemWrap>
            </List.Item>
          )}
        />
      }
    </S3View>
  )
}

const S3View = styled.div``
const FolderImg = styled.img``
const ItemName = styled.span`
  display: inline-block;
  padding: 0 0 0 5px;
`
const listItem = css`
  cursor: pointer;
  padding: 12px 0 12px 10px !important;
  :hover {
    background: #1890ff1a;
  }
`
const ItemWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export { _S3View as S3View }
