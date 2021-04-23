import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post } from '.';

export function remove(id: string): AxiosPromise<Post> {
  return axios({
    url: `/posts/${id}`,
    method: 'delete'
  })
}
