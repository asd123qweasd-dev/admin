import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";



export function restore(id: string): AxiosPromise<Category> {
  return axios({
    url: `/categories/${id}/restore`,
    method: 'post'
  })
}
