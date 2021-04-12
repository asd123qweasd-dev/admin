import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'
import { User } from '../users'


export function me(): AxiosPromise<User> {
  return axios({
    url: '/auth/me/',
    method: 'get'
  })
}
