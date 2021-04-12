import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from ".";



export function restore(id: string): AxiosPromise<User> {
  return axios({
    url: `/users/${id}/restore`,
    method: 'post'
  })
}
