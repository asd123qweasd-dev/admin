import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";


export function update(id: string, data: Category): AxiosPromise<Category> {
  return axios({
    url: `/categories/${id}`,
    method: 'put',
    data
  })
}
