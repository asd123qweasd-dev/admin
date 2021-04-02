import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '~/api'
import { AppThunk } from '~/store'
import { FieldData } from 'rc-field-form/lib/interface'
import { registrationFormData } from './data'
import { authSlice } from '../auth'
import { hasRemember } from '~/helpers/hasRemember'

export type RegistrationFormData = FieldData[]

export type RegistrationFormState = {
  loading: boolean
  form: RegistrationFormData
}

const initialState: RegistrationFormState = {
  loading: false,
  form: registrationFormData
}

export const registrationFormSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeForm: (state, action: PayloadAction<RegistrationFormData>) => {
      state.form = [...action.payload]
    },
    changeLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { changeLoader, changeForm } = registrationFormSlice.actions

export const submit = (): AppThunk => async (dispatch, getState) => {
  dispatch(changeLoader(true))
  const registrationForm = getState().registrationForm
  try {
    const { data } = await api.auth.register(getRegistrationData(registrationForm.form))
    data.remember = hasRemember(registrationForm.form)
    dispatch(authSlice.actions.changeSession(data))
  } catch (err) {
    if (err.isAxiosError) {
      let newData = [...registrationForm.form]

      for (let key in err.response.data.errors) {
        let field = newData.find(item => ~String(item.name).indexOf(key))
        if (field) {
          const updField = { ...field, errors: [...err.response.data.errors[key]] }
          newData = newData.filter(item => !~String(item.name).indexOf(key))
          newData.push(updField)
        }
      }
      dispatch(changeForm(newData))
    }
  }
  dispatch(changeLoader(false))
}

function getRegistrationData(data: RegistrationFormData) {
  const name = data.find(item => ~String(item?.name)?.indexOf('name'))?.value
  const email = data.find(item => ~String(item?.name)?.indexOf('email'))?.value
  const password = data.find(item => ~String(item?.name)?.indexOf('password'))?.value
  const password_confirmation = data.find(item => ~String(item?.name)?.indexOf('password_confirmation'))?.value
  return { name, email, password, password_confirmation }
}
