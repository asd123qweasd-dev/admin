import { shallowEqual } from "react-redux"
import { RootState, useAppDispatch, useAppSelector } from "~/store"
import { RegistrationFormData, submit, changeForm } from "./slice"

const registrationFormState = (state: RootState) => ({ ...state.registrationForm })

export function useRegistrationForm() {
  const registrationForm = useAppSelector(registrationFormState, shallowEqual)
  const dispatch = useAppDispatch()

  return {
    ...registrationForm,
    changeForm: (data: RegistrationFormData) => dispatch(changeForm(data)),
    submit: () => dispatch(submit())
  }
}
