import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentNatoursUser: null,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.currentNatoursUser = null
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.currentNatoursUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.currentNatoursUser = null
      state.loading = false
      state.error = action.payload
    },
    logOutSuccess: (state) => {
      state.currentNatoursUser = null
      state.loading = false
      state.error = null
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, logOutSuccess } =
  userSlice.actions

export default userSlice.reducer
