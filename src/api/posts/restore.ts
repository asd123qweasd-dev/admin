import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post } from '.';


export function restore(id: string): AxiosPromise<Post> {
  return axios({
    url: `/posts/${id}/restore`,
    method: 'post'
  })
}
