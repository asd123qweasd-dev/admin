import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Permissions } from ".";


export function getOne(id: string): AxiosPromise<Permissions> {
  return axios({
    url: `/permissions/${id}`,
    method: 'get'
  })
}
