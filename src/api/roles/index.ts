import { getAll } from './getAll'
import { getOne } from './getOne'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { assign } from './assign'
import { Permissions } from '../permissions/'

export type Role = {
  id: number
  name: Maybe<string>
  permissions?: Permissions[]
}

export type RoleField = {
  name: string
}

export const roles = {
  getAll,
  getOne,
  create,
  update,
  remove,
  assign,
}
