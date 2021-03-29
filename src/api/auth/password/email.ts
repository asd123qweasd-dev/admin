import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'
import { TokenResponse } from '..'

export type PasswordEmailRequest = {
  email: string
}
export type PasswordEmailResponse = TokenResponse

export function email(data: PasswordEmailRequest): AxiosPromise<PasswordEmailResponse> {
  return axios({
    url: '/auth/password/email/',
    method: 'post',
    data
  })
}
