import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { List, Image } from 'antd'
import folderImg from '~/assets/folder.svg'
import { css } from '@emotion/css'
import { useHistory } from 'react-router'

export type CommonPrefixes = {
  Prefix: string
}
export type StorageClass = 'COLD'
export type Owner = {
  DisplayName: string
  ID: string
}
export type Contents = {
  Key: string,
  LastModified: string,
  ETag: string,
  Size: number,
  StorageClass: StorageClass
  Owner: Owner
}
export type S3 = {
  CommonPrefixes: CommonPrefixes[]
  Contents: Contents[]
  Delimiter: string
  IsTruncated: boolean
  KeyCount: number
  MaxKeys: number
  Name: string
  Prefix: string
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

  return (
    <S3View>
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
                <Image src={`https://storage.yandexcloud.net/dnr-dev/${item.Key}`} width={100} height={56}/> <ItemName>{getFileName(item.Key)}</ItemName>
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
