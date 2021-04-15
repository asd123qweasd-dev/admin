import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";

export function remove(id: string): AxiosPromise<Category> {
  return axios({
    url: `/categories/${id}`,
    method: 'delete'
  })
}
