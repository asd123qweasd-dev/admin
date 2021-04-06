import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { notification } from 'antd'
import { FieldData } from 'rc-field-form/lib/interface'
import { userFormData } from './data'
import api from '~/api'
import { showErrorFields } from '~/helpers'

export type FormType = 'update'|'create'
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

export const create = (value: UserFormModel): AppThunk => async (dispatch, getState) => {
  const userForm = getState().userForm
  dispatch(changeLoader(true))
  try {
    await api.users.create(value)
  } catch (err) {
    showErrorFields(err, dispatch, changeForm, userForm.form)
  }
  dispatch(changeLoader(false))
}

export const update = (id: number, value: UserFormModel): AppThunk => async (dispatch, getState) => {
  const userForm = getState().userForm
  dispatch(changeLoader(true))
  try {
    await api.users.update(id, value)
  } catch (err) {
    showErrorFields(err, dispatch, changeForm, userForm.form)
  }
  dispatch(changeLoader(false))
}
