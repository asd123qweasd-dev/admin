import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'
import { TokenResponse } from '.'

export type RegisterRequest = {
  name: string
  email: string
  password: string
  password_confirmation: string
}
export type RegisterResponse = TokenResponse

export function register(data: RegisterRequest): AxiosPromise<RegisterResponse> {
  return axios({
    url: '/auth/register/',
    headers: { showError: false },
    method: 'post',
    data
  })
}
