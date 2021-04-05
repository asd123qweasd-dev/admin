import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { submit, UserFormData, changeForm, UserFormModel, changeLoader } from "./slice"

const userFormState = (state: RootState) => ({ ...state.userForm })

export function useUserForm() {
  const userForm = useAppSelector(userFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...userForm,
    changeLoader: (data: boolean) => dispatch(changeLoader(data)),
    changeForm: (data: UserFormData) => dispatch(changeForm(data)),
    submit: (value: UserFormModel) => dispatch(submit(value))
  }
}
