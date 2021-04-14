import { shallowEqual } from "react-redux"
import { TokenResponse } from "~/api/auth"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { logout, getMe, setSession } from "~/store/auth"

const authState = (state: RootState) => ({ ...state.auth })

export function useAuth() {
  const auth = useAppSelector(authState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...auth,
    get isAuth() {
      return Boolean(auth.session)
    },
    logout: () => dispatch(logout()),
    setSession: (session: Maybe<TokenResponse>) => dispatch(setSession(session)),
    getMe: () => dispatch(getMe())
  }
}
