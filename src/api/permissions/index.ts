import { getAll } from './getAll'
import { getOne } from './getOne'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { assign } from './assign'
import {Role} from '../roles'

export type Permissions = {
  id: number
  name: Maybe<string>
  roles?: Role[]
}

export type PermissionsField = {
  name: string
}

export const permissions = {
  getAll,
  getOne,
  create,
  update,
  remove,
  assign,
}
