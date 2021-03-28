import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  access_token: string
  expires_at: string
  token_type: string
}

export function login (data:LoginRequest):AxiosPromise<LoginResponse> {
  return axios({
    url: '/auth/login/',
    method: 'post',
    data
  })
}
