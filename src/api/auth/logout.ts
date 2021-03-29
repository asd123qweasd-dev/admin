import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'

export type LogoutResponse = {
  status: boolean
}

export function logout(): AxiosPromise<LogoutResponse> {
  return axios({
    url: '/auth/logout/',
    method: 'post'
  })
}
