import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Role } from ".";

export function remove(id: string): AxiosPromise<Role> {
  return axios({
    url: `/roles/${id}`,
    method: 'DELETE'
  })
}
