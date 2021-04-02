import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { logout, getMe } from "./slice"

const authState = (state: RootState) => ({ ...state.auth })

export function useAuth() {
  const auth = useAppSelector(authState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...auth,
    get isAuth() {
      return Boolean(auth.session)
    },
    logout() {
      dispatch(logout())
    },
    getMe() {
      dispatch(getMe())
    }
  }
}
