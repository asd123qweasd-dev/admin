import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";


export function getOne(id: string): AxiosPromise<Category> {
  return axios({
    url: `/categories/${id}`,
    method: 'get'
  })
}
