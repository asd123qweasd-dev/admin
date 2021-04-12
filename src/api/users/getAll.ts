import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from ".";
import { ApiPagination } from "~/api";



export function getAll(): AxiosPromise<ApiPagination<User>> {
  return axios({
    url: '/users',
    method: 'get'
  })
}
