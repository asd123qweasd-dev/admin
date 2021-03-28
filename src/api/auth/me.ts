import { AxiosPromise } from 'axios'
import axios from '~/lib/axios'

export type MeResponse = {
  id: number
  name: Maybe<string>,
  email: Maybe<string>,
  email_verified_at: Maybe<Date>,
  created_at: Maybe<Date>,
  updated_at: Maybe<Date>,
  deleted_at: Maybe<Date>,
  images: Maybe<string[]>
}

export function me(): AxiosPromise<MeResponse> {
  return axios({
    url: '/auth/me/',
    method: 'get'
  })
}
