import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post, PostInput } from '.';


export function update(id: string, data: PostInput): AxiosPromise<Post> {
  return axios({
    url: `/posts/${id}`,
    method: 'put',
    data
  })
}
