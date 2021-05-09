import { AxiosPromise } from "axios";
import { S3_BASE_URL } from '~/config';
import axios from "~/lib/axios";
import { S3_ResponseItem } from '~/types/s3';


export function upload(file:any, folder?: string): AxiosPromise<S3_ResponseItem>{
  var formData = new FormData();
  formData.append(`image`, file)

  return axios({
    url: `${S3_BASE_URL}${folder || '/temp'}`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
