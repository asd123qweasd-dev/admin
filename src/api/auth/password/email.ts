import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'

export type PasswordEmailRequest = {
  email: string
}
export type PasswordEmailResponse = {
  status: string
}

export function email(data: PasswordEmailRequest): AxiosPromise<PasswordEmailResponse> {
  return axios({
    url: '/auth/password/email/',
    method: 'post',
    data
  })
}
