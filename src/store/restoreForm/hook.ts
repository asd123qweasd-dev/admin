import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { LoginFormData, submit, changeForm } from "./slice"

const loginFormState = (state: RootState) => ({ ...state.loginForm })

export function useLoginForm() {
  const loginForm = useAppSelector(loginFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...loginForm,
    changeForm(data: LoginFormData) {
      dispatch(changeForm(data))
    },
    submit() {
      dispatch(submit())
    }
  }
}
