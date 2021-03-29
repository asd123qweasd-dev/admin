import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'
import { TokenResponse } from '.'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = TokenResponse

export function login (data:LoginRequest):AxiosPromise<LoginResponse> {
  return axios({
    url: '/auth/login/',
    method: 'post',
    data
  })
}
