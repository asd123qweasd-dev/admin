import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { submit, changeForm, RestoreFormData } from "./slice"

const restoreFormState = (state: RootState) => ({ ...state.restoreForm })

export function useRestoreForm() {
  const restoreForm = useAppSelector(restoreFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...restoreForm,
    changeForm(data: RestoreFormData) {
      dispatch(changeForm(data))
    },
    submit() {
      dispatch(submit())
    }
  }
}
