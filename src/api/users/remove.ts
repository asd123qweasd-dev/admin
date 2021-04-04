import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { User } from ".";



export function me(): AxiosPromise<User> {
  return axios({
    url: '/users',
    method: 'get'
  })
}
