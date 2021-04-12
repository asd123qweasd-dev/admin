import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Permissions, PermissionsField } from ".";


export function create(data: PermissionsField): AxiosPromise<Permissions> {
  return axios({
    url: '/permissions',
    method: 'post',
    data
  })
}
