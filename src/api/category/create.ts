import { AxiosPromise } from "axios";
import axios from "~/lib/axios";
import { Category } from ".";


export function create(data: Category): AxiosPromise<Category> {
  return axios({
    url: '/categories',
    method: 'post',
    data
  })
}
