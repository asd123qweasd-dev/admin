import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Permissions } from ".";


export function assign(permissionId: string, roleId: string): AxiosPromise<Permissions> {
  return axios({
    url: `/permissions/${permissionId}/roles/${roleId}/assign`,
    method: 'patch'
  })
}
