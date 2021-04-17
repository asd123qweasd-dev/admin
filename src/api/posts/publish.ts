import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post } from '.';


export function publish(id: string): AxiosPromise<Post> {
  return axios({
    url: `/posts/${id}/publish`,
    method: 'patch'
  })
}
