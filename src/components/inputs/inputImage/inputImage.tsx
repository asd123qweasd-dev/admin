import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import ImgCrop from 'antd-img-crop';
import { message, Upload } from 'antd';
import { PostImage } from '~/api/posts';
import { useHistory } from 'react-router';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface InputImageProps {
  onChange?: (data: any) => void
  value?: number
  id?: string
  data?: Maybe<PostImage[]>
}

const _InputImage: FC<InputImageProps> = (props) => {
  const initialImages = props.data?.map((item, key) => ({uid: `-${key}`, url: item.original}))
  const [fileList, setFileList] = useState<any>(initialImages || [])
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const history = useHistory()
  console.log(props);
  

  const onChange = ({ fileList: newFileList }:any) => {
    const fileArr = newFileList.map((item:any) => item.originFileObj)
    props.onChange?.(fileArr)
    setFileList(newFileList)
  }

  const onPreview = async (file:any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    //@ts-ignore
    imgWindow.document.write(image.outerHTML);
  }

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
  function getBase64(img:any, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  function handleChange(info:any) {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:any) =>{
        setImageUrl(imageUrl)
        setLoading(false)
      });
    }
  };

  return (
    <InputImage>
      <ImgCrop rotate grid shape="rect" aspect={16/9} quality={1}>
        {/* <Upload
          action={`https://s3.dnr.dev${history.location.pathname}`}
          listType="picture-card"
          fileList={fileList}
          multiple={false}
          onChange={onChange}
          onPreview={onPreview}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload> */}
        <Upload
        // name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`https://s3.dnr.dev${history.location.pathname}`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </ImgCrop>
    </InputImage>
  )
}

const InputImage = styled.div``

export { _InputImage as InputImage }
