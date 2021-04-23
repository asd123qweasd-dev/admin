import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post } from ".";


export function getOne(id: string): AxiosPromise<Post> {
  return axios({
    url: `/posts/${id}`,
    method: 'get'
  })
}
