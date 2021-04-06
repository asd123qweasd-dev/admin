import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { create, update, UserFormData, changeForm, UserFormModel, changeLoader, FormType } from "./slice"

const userFormState = (state: RootState) => ({ ...state.userForm })

export function useUserForm() {
  const userForm = useAppSelector(userFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...userForm,
    changeLoader: (data: boolean) => dispatch(changeLoader(data)),
    changeForm: (data: UserFormData) => dispatch(changeForm(data)),
    create: (value: UserFormModel) => dispatch(create(value)),
    update: (id: number, value: UserFormModel) => dispatch(update(id, value)),
    remove: (id: number, value: UserFormModel) => dispatch(update(id, value))
  }
}
