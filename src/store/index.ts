import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import clockReducer from './clockSlice'
import authReducer from './auth'

const rootReducer = combineReducers ( {
  clock: clockReducer,
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
