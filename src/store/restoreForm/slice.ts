import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { notification } from 'antd'
import api from '~/api'
import { FieldData } from 'rc-field-form/lib/interface'
import {restoreFormData} from './data'
import { showErrorFields } from '~/helpers'

export type RestoreFormData = FieldData[]

type RestoreFormState = {
  loading: boolean,
  form: RestoreFormData
}

const initialState: RestoreFormState = {
  loading: false,
  form: restoreFormData
}

export const restoreFormSlice = createSlice({
  name: 'restoreForm',
  initialState,
  reducers: {
    changeForm: (state, action: PayloadAction<RestoreFormData>) => {
      state.form = [...action.payload]
    },
    changeLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { changeLoader, changeForm } = restoreFormSlice.actions

export const submit = (): AppThunk => async (dispatch, getState) => {
  dispatch(changeLoader(true))
  const restoreForm = getState().restoreForm
  try {
    const {data} = await api.auth.password.email(getRestoreData(restoreForm.form))
    notification.success({
      message: data.status
    })
  } catch (err) {
    showErrorFields(err, dispatch, changeForm, restoreForm.form)
  }
  dispatch(changeLoader(false))
}

function getRestoreData(data: RestoreFormData) {
  const email = data.find(item => ~String(item?.name)?.indexOf('email'))?.value
  return { email }
}
