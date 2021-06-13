import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/userService'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: null,
      username: null,
      roles: [],
      isAuthenticated: false
    }
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

// Async thunks
export const login = (username, password) => async dispatch => {
  try {
    const user = await userService.login(username, password)
    dispatch(setUser(user))
  } catch (e) {
    console.error(e)
  }
}

export const selectUser = state => state.user.user 

export default userSlice.reducer