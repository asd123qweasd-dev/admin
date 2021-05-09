import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import ImgCrop from 'antd-img-crop';
import { message, Upload } from 'antd';
import { useHistory } from 'react-router';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { S3_STORAGE_URL } from '~/config';

interface InputImageProps {
  onChange?: (data: any) => void
  value?: string
  id?: string
}

const _InputImage: FC<InputImageProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string|undefined>(props?.value)
  const history = useHistory()

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function beforeUpload(file:any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg';
    if (!isJpgOrPng) {
      message.error('Изображение должно быть формата JPG/PNG/SVG');
    }
    // const isLt2M = file.size / 1024 / 1024 < 5;
    // if (!isLt2M) {
    //   message.error('Максимальный размер изображения 5MB');
    // }
    return isJpgOrPng
  }
  function handleChange(info:any) {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.key)
      setLoading(false)
      props.onChange?.(info.file.response.key)
    }
  }

  return (
    <InputImage>
      <ImgCrop rotate grid shape="rect" aspect={16/9} quality={1}>
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`https://s3.dnr.dev${history.location.pathname}`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
        {imageUrl ? <img src={`${S3_STORAGE_URL}${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </ImgCrop>
    </InputImage>
  )
}

const InputImage = styled.div``

export { _InputImage as InputImage }
