import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category, CategoryInput } from ".";


export function create(data: CategoryInput): AxiosPromise<Category> {
  return axios({
    url: '/categories',
    method: 'post',
    data
  })
}
