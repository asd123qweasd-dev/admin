import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Role, RoleField } from ".";


export function update(id: string, data: RoleField): AxiosPromise<Role> {
  return axios({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}
