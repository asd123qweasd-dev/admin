import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post, PostInput } from ".";


export function create(data: PostInput): AxiosPromise<Post> {
  return axios({
    url: '/posts',
    method: 'post',
    data
  })
}
