import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clockReducer from './clockSlice'
import authReducer from './auth'

const rootReducer = combineReducers({
  clock: clockReducer,
  auth: authReducer
})

export type CoreState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
  devTools: true
})
