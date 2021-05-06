import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post, PostInput } from ".";


export function create(data: PostInput): AxiosPromise<Post> {
  var formData = new FormData();

  data.author_id && formData.append('author_id', String(data.author_id))
  data.category_id && formData.append('category_id', String(data.category_id))
  data.name && formData.append('name', String(data.name))
  data.slug && formData.append('slug', String(data.slug))
  data.body && formData.append('body', JSON.stringify(data.body))
  data.image && formData.append(`image`, data.image[0])
  // data.image && data.image.forEach((file, key) => {
  //   formData.append(`image[${key}]`, file)
  // })
  data.title && formData.append('title', data.title)
  data.description && formData.append('description', data.description)
  data.keywords && formData.append('keywords', data.keywords)

  return axios({
    url: '/posts',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
