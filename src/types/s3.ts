

export type S3 = {
  CommonPrefixes: S3_CommonPrefixes[]
  Contents: S3_Contents[]
  Delimiter: string
  IsTruncated: boolean
  KeyCount: number
  MaxKeys: number
  Name: string
  Prefix: string
}

export type S3_CommonPrefixes = {
  Prefix: string
}

export type S3_Contents = {
  Key: string,
  LastModified: string,
  ETag: string,
  Size: number,
  StorageClass: S3_StorageClass
  Owner: S3_Owner
}

export type S3_StorageClass = 'COLD'

export type S3_Owner = {
  DisplayName: string
  ID: string
}

export type S3_ResponseItem = {
  Bucket: string
  ETag: string
  Key: string
  Location: string
  VersionId: string
  key: string
}
