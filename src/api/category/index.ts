import { getAll } from './getAll'
import { getOne } from './getOne'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { status } from './status'

export type Category = {
  parent_id: Maybe<number>
  slug: Maybe<string>
  name: Maybe<string>
  title: Maybe<string>
  description: Maybe<string>
  keywords: Maybe<string>
  is_active: boolean
  created_at: Maybe<string>
  updated_at: Maybe<string>
  deleted_at: Maybe<string>
}

export const roles = {
  getAll,
  getOne,
  create,
  update,
  remove,
  status,
}
