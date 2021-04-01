import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '~/api'
import { TokenResponse } from '~/api/auth'
import { AppThunk } from '../index'
import { getSession, updateSession } from '~/helpers/session'
import { notification } from 'antd'

type AuthState = {
  session: Maybe<TokenResponse>
}

const initialState: AuthState = {
  session: getSession()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Maybe<TokenResponse>>) => {
      state.session = action.payload
      updateSession(action.payload)
    }
  }
})


export const { change } = authSlice.actions

export const logout = (): AppThunk => async (dispatch, getState) => {
  dispatch(authSlice.actions.change(null))
  try {
    await api.auth.logout()
  } catch (err) {
    notification.error({ 
      message: 'Ошибка', 
      description: err.message
    })
  }
}
