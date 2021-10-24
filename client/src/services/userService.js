import axios from 'axios'

const userService = {
  login: async (username, password) => {
    const { data } = await axios.post('/auth/login', { username, password })
    return data
  },

  loginWithGoogle: async () => {
    const { data } = await axios.get('/auth/google/login')
    return data
  },

  getUser: async () => {
    const { data } = await axios.get('/auth/user')
    return data
  },

  logout: async () => await axios.get('/auth/logout'),
}

export default userService
