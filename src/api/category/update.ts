import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category, CategoryInput } from ".";


export function update(id: string, data: CategoryInput): AxiosPromise<Category> {
  return axios({
    url: `/categories/${id}`,
    method: 'put',
    data
  })
}
