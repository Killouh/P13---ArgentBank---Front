import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  isLoading: false,
  isAuth: false,
  isRemember: false,
  error: '',
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logingPending: (state) => {
      state.isLoading = true
    },
    logingSuccess: (state) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''
    },
    storedToken: (state, action) => {
      state.token = action.payload;
      state.error = ''
    },
    logingError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
    logOut: (state) => {
      state.isLoading = false
      state.isAuth = false
      state.error = ''
    },
  },
})
const { actions, reducer } = loginSlice
export const {
  logingPending,
  logingSuccess,
  logingError,
  logOut,
  logingRemember,
  storedToken,
} = actions
export default reducer

export const selectIsAuth = state => state.login.isAuth;