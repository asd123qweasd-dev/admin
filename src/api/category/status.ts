import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";



export function status(id: string): AxiosPromise<Category> {
  return axios({
    url: `/categories/${id}/status`,
    method: 'patch'
  })
}
