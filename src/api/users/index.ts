import {getAll} from './getAll'
import {getOne} from './getOne'
import {create} from './create'
import {update} from './update'

export type User = {
  id: number
  name: Maybe<string>,
  email: Maybe<string>,
  email_verified_at: Maybe<string>,
  created_at: Maybe<string>,
  updated_at: Maybe<string>,
  deleted_at: Maybe<string>,
  images: Maybe<string[]>
}

export const users = {
  getAll,
  getOne,
  create,
  update
}
