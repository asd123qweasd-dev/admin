import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Role } from ".";
import { ApiPagination } from "~/api";


export function getAll(): AxiosPromise<ApiPagination<Role>> {
  return axios({
    url: '/roles',
    method: 'get'
  })
}
