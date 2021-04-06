import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from ".";

export type UserField = {
  name: string
  email: string
  password: string
}

export function create(data: UserField): AxiosPromise<User> {
  return axios({
    url: '/users',
    headers: { showError: false },
    method: 'post',
    data
  })
}
