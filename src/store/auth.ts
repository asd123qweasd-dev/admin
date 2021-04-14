import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '~/api'
import { TokenResponse } from '~/api/auth'
import { AppThunk } from './index'
import { getSession, updateSession } from '~/helpers/session'
import { notification } from 'antd'
import { User } from '~/api/users'

type AuthState = {
  loading: boolean
  session: Maybe<TokenResponse>
  user: Maybe<User>
}

const initialState: AuthState = {
  loading: false,
  session: getSession(),
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Maybe<TokenResponse>>) => {
      state.session = action.payload
      updateSession(action.payload)
    },
    changeLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    changeMe: (state, action: PayloadAction<Maybe<User>>) => {
      state.user = action.payload
    }
  }
})

export const { changeLoader, setSession, changeMe } = authSlice.actions

export const logout = (): AppThunk => async (dispatch, getState) => {
  dispatch(changeLoader(true))
  try {
    await api.auth.logout()
  } catch (err) {
    notification.error({
      message: 'Ошибка',
      description: err.message
    })
  }
  dispatch(setSession(null))
  dispatch(changeLoader(false))
}

export const getMe = (): AppThunk => async (dispatch, getState) => {
  dispatch(changeLoader(true))
  try {
    const { data } = await api.auth.me()
    dispatch(changeMe(data))
  } catch (err) {
    dispatch(setSession(null))
    notification.error({
      message: 'Ошибка',
      description: err.message
    })
  }
  dispatch(changeLoader(false))
}
