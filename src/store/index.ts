import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loginFormSlice } from './loginForm'
import authReducer from './auth'

const rootReducer = combineReducers ( {
  loginForm: loginFormSlice.reducer,
  auth: authReducer
})
 
export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
