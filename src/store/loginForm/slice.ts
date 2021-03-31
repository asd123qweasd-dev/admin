import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '~/api'
import { AppThunk } from '~/store'

export type LoginForm = {
  email: string
  password: string
}

export type LoginFormState = {
  loading: boolean
  form: LoginForm
}

const initialState: LoginFormState = {
  loading: false,
  form: {
    email: '',
    password: ''
  }
}

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    changeForm: (state, action: PayloadAction<Partial<LoginForm>>) => {
      console.log(action.payload);
      
      state.form = {...state.form, ...action.payload}
    }
  }
})

export const submit = ():AppThunk => async (dispatch, getState) => {
  console.log('ad');
  
  const authParam = getState().auth.loginForm
  try {
    const {data} = await api.auth.login(authParam)
    console.log(data)
  }catch(err){}
}

// export const { formValuesChange } = loginFormSlice.actions
// export default loginFormSlice.reducer
