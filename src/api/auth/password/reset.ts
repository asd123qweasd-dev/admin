import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'

export type PasswordResetRequest = {
  email: string
  password: string
  password_confirmation: string
  token: string
}
export type PasswordResetResponse = {
  access_token: string
  expires_at: string
  token_type: string
}

export function reset(data: PasswordResetRequest): AxiosPromise<PasswordResetResponse> {
  return axios({
    url: '/auth/password/email/',
    method: 'post',
    data
  })
}
