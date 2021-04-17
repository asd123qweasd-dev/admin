import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Post } from ".";
import { ApiPagination } from "~/api";


export function getAll(): AxiosPromise<ApiPagination<Post>> {
  return axios({
    url: '/posts',
    method: 'get'
  })
}
