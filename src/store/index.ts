import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clockReducer from './clockSlice'

const rootReducer = combineReducers({
  clock: clockReducer
})

export type CoreState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
  devTools: true,
})
