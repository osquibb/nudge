import axios from 'axios'

const userService = {
  login: async (username, password) =>
    await axios.post('/login', { username, password }),
    
  logout: async () => await axios.get('/logout')
}

export default userService