import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/userService'

const initialState = {
  id: null,
  username: null,
  roles: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => Object.assign(state, payload),
    resetUser: (state, action) => Object.assign(state, initialState)
  },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions

// Async thunks
export const login = (username, password) => async dispatch => {
  try {
    const user = await userService.login(username, password)
    dispatch(setUser(user))
  } catch (e) {
    console.error(e)
  }
}

export const logout = () => async dispatch => {
  try {
    await userService.logout()
    dispatch(resetUser())
  } catch (e) {
    console.error(e)
  }
}

export const selectUser = state => state.user 

export default userSlice.reducer