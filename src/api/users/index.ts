import {getAll} from './getAll'
import {getOne} from './getOne'
import {create} from './create'

export type User = {
  id: number
  name: Maybe<string>,
  email: Maybe<string>,
  email_verified_at: Maybe<Date>,
  created_at: Maybe<Date>,
  updated_at: Maybe<Date>,
  deleted_at: Maybe<Date>,
  images: Maybe<string[]>
}

export {
  getAll,
  getOne,
  create
}
