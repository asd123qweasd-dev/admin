import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { create, remove, update, handleFormCreate, handleFormUpdate,  changeLoader } from "./slice"
import { FieldData } from 'rc-field-form/lib/interface'
import { UsersModel } from "~/store/users"

const userFormState = (state: RootState) => ({ ...state.users })

export function useUsers() {
  const userForm = useAppSelector(userFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...userForm,
    changeLoader: (data: boolean) => dispatch(changeLoader(data)),
    handleFormCreate: (data: FieldData[]) => dispatch(handleFormCreate(data)),
    handleFormUpdate: (data: FieldData[]) => dispatch(handleFormUpdate(data)),
    create: (value: UsersModel) => dispatch(create(value)),
    update: (id: number, value: UsersModel) => dispatch(update(id, value)),
    remove: (id: number) => dispatch(remove(id))
  }
}
