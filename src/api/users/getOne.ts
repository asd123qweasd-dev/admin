import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from ".";



export function getOne(id: string): AxiosPromise<User> {
  return axios({
    url: `/users/${id}`,
    method: 'get'
  })
}
