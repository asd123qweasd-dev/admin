import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";
import { ApiPagination } from "~/api";


export function getAll(): AxiosPromise<ApiPagination<Category>> {
  return axios({
    url: '/categories',
    method: 'get'
  })
}
