import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { notification } from 'antd'
import { FieldData } from 'rc-field-form/lib/interface'
import { userFormData } from './data'
import api from '~/api'
import { showErrorFields } from '~/helpers'

export type UserFormData = FieldData[]
export type UserFormModel = {
  email: string
  name: string
  password: string
}
type UserFormState = {
  loading: boolean
  form: UserFormData
}

const initialState: UserFormState = {
  loading: false,
  form: userFormData
}

export const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    changeForm: (state, action: PayloadAction<UserFormData>) => {
      state.form = action.payload
    },
    changeLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { changeLoader, changeForm } = userFormSlice.actions

export const submit = ({ email, name, password }: UserFormModel): AppThunk => async (dispatch, getState) => {
  const userForm = getState().userForm
  dispatch(changeLoader(true))
  try {
    const req = { email, name, password }

    await api.users.create(req)
  } catch (err) {
    showErrorFields(err, dispatch, changeForm, userForm.form)
  }
  dispatch(changeLoader(false))
}
