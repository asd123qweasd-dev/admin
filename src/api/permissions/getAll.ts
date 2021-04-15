import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Permissions } from ".";
import { ApiPagination } from "~/api";


export function getAll(): AxiosPromise<ApiPagination<Permissions>> {
  return axios({
    url: '/permissions',
    method: 'get'
  })
}
