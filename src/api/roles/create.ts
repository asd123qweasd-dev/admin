import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Role, RoleField } from ".";


export function create(data: RoleField): AxiosPromise<Role> {
  return axios({
    url: '/roles',
    method: 'post',
    data
  })
}
