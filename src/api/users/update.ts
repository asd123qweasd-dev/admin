import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from ".";



export type UserField = {
  name: string
  email: string
  password: string
}

export function update(id: number, data: UserField): AxiosPromise<User> {
  return axios({
    url: `/users/${id}`,
    headers: { showError: false },
    method: 'put',
    data
  })
}
