import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Permissions, PermissionsField } from ".";


export function update(id: string, data: PermissionsField): AxiosPromise<Permissions> {
  return axios({
    url: `/permissions/${id}`,
    method: 'put',
    data
  })
}
