import { usersSlice } from './slice'
import { useUsers } from './hook'

export type UsersModel = {
  email: string
  name: string
  password: string
}

export {
  useUsers,
  usersSlice
}
