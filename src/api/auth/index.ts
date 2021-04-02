import { me } from './me'
import { login } from './login'
import { logout } from './logout'
import { register } from './register'
import { password } from './password'

export type TokenResponse = {
  access_token: string
  expires_at: string
  token_type: string
  remember?: boolean
}

export const auth = {
  me, login, logout, register, password
}
