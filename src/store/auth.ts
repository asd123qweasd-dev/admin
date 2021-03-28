import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CoreState } from '~/store'

type AuthFormData = {
  email: string
  password: string
}

type AuthState = {
  form: AuthFormData
}

const initialState: AuthState = {
  form: {
    email: '',
    password: ''
  }
}

const authSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    tick: (state, action: PayloadAction<AuthState>) => {
      state.form = {email: 'asd', password: 'asd'}
    },
  },
})

export const selectClock = (state: CoreState) => state.clock

export const { tick } = authSlice.actions

export default authSlice.reducer
