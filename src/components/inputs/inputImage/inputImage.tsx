import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';

interface InputImageProps {
  onChange?: (data: any) => void
  value?: number
  id?: string
}

const _InputImage: FC<InputImageProps> = (props) => {
  const [fileList, setFileList] = useState<any>([])

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
  };

  return (
    <InputImage>
      <ImgCrop rotate grid shape="rect" aspect={16/9} quality={1}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          multiple={false}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </InputImage>
  )
}

const InputImage = styled.div``

export { _InputImage as InputImage }
