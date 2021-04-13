import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from "~/api/users";



export function assign(roleId: string, userId: string): AxiosPromise<User> {
  return axios({
    url: `/roles/${roleId}/users/${userId}/assign`,
    method: 'patch'
  })
}
