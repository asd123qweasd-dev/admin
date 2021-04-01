import { TokenResponse } from '~/api/auth'

export function updateSession(session: TokenResponse | null) {
  if (!(session && session.access_token && session.expires_at)) {
    localStorage.removeItem('session')
  } else {
    localStorage.setItem('session', JSON.stringify(session))
  }
}

export function getSession(): TokenResponse | null {
  const sessionStr = localStorage.getItem('session')
  return sessionStr ? JSON.parse(sessionStr) : null
}

export function getExpire(): number {
  const expireStr = localStorage.getItem('expire')
  return expireStr ? Number(expireStr) : 0
}
