import axios from 'axios'

const userService = {
  login: async (username, password) => {
    const { data } = await axios.post('/auth/login', { username, password })
    return data
  },
    
  logout: async () => await axios.get('/auth/logout')
}

export default userService