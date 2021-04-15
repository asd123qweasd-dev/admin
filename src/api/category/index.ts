import { getAll } from './getAll'
import { getOne } from './getOne'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { status } from './status'
import { restore } from './restore'

export type Category = {
  id: string
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

export type CategoryInput = Pick<Category, 'slug'|'name'|'title'|'keywords'|'description'>

export const category = {
  getAll,
  getOne,
  create,
  update,
  remove,
  status,
  restore
}
