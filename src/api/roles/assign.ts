import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Role } from ".";



export function assign(roleId: string, userId: string): AxiosPromise<Role> {
  return axios({
    url: `/roles/${roleId}/users/${userId}/assign`,
    method: 'patch'
  })
}
