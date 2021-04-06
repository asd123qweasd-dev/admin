import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { notification } from 'antd'
import { FieldData } from 'rc-field-form/lib/interface'
import { usersFormData } from './data'
import api from '~/api'
import {User} from '~/api/users'
import { showErrorFields } from '~/helpers'
import { UsersModel } from '.'

type UsersState = {
  loading: boolean
  one: Maybe<User>
  formCreate: FieldData[]
  formUpdate: FieldData[]
}

const initialState: UsersState = {
  loading: false,
  one: null,
  formCreate: usersFormData,
  formUpdate: usersFormData
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    handleFormCreate: (state, action: PayloadAction<FieldData[]>) => {
      state.formCreate = action.payload
    },
    handleFormUpdate: (state, action: PayloadAction<FieldData[]>) => {
      state.formUpdate = action.payload
    },
    changeLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { changeLoader, handleFormCreate, handleFormUpdate } = usersSlice.actions

export const create = (value: UsersModel): AppThunk => async (dispatch, getState) => {
  const users = getState().users
  dispatch(changeLoader(true))
  try {
    await api.users.create(value)
  } catch (err) {
    showErrorFields(err, dispatch, handleFormCreate, users.formCreate)
  }
  dispatch(changeLoader(false))
}

export const update = (id: number, value: UsersModel): AppThunk => async (dispatch, getState) => {
  const users = getState().users
  dispatch(changeLoader(true))
  try {
    await api.users.update(id, value)
  } catch (err) {
    showErrorFields(err, dispatch, handleFormUpdate, users.formUpdate)
  }
  dispatch(changeLoader(false))
}

export const remove = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(changeLoader(true))
  try {
    await api.users.remove(id)
    notification.success({
      message: 'ok'
    })
  } catch (err) {}
  dispatch(changeLoader(false))
}
