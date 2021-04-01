import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { LoginFormData, loginFormSlice, submit } from "./slice"

const loginFormState = (state: RootState) => ({ ...state.loginForm })

export function useLoginForm() {
  const loginForm = useAppSelector(loginFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...loginForm,
    changeForm(data: LoginFormData) {
      dispatch(loginFormSlice.actions.changeForm(data))
    },
    submit() {
      dispatch(submit())
    }
  }
}
