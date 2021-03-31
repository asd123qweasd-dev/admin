import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '~/api'
import { AppThunk } from './index'

export type AuthLoginForm = {
  email: string
  password: string
}

export type AuthState = {
  loginForm: AuthLoginForm
}

const initialState: AuthState = {
  loginForm: {
    email: '',
    password: ''
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    valuesChange: (state, action: PayloadAction<Partial<AuthLoginForm>>) => {
      state.loginForm = {...state.loginForm, ...action.payload}
    },
  },
})

export const { valuesChange } = authSlice.actions


export default authSlice.reducer
