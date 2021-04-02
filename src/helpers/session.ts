import { TokenResponse } from '~/api/auth'

export function updateSession(session: TokenResponse | null) {
  if (!(session && session.access_token && session.expires_at)) {
    localStorage.removeItem('session')
    sessionStorage.removeItem('session')
  } else {
    session.remember
    ? localStorage.setItem('session', JSON.stringify(session))
    : sessionStorage.setItem('session', JSON.stringify(session))
  }
}

export function getSession(): TokenResponse | null {
  const shotrSessionStr = sessionStorage.getItem('session')
  const longSessionStr = localStorage.getItem('session')
  const sessionStr = shotrSessionStr || longSessionStr
  return sessionStr ? JSON.parse(sessionStr) : null
}

export function getExpire(): number {
  const expireStr = localStorage.getItem('expire')
  return expireStr ? Number(expireStr) : 0
}
