import React, { useState } from 'react'
import axios from 'axios';

export default function LoginForm(props) {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [health, setHealth] = useState('N/A')

  const onUsernameChange = username => setUser({
    ...user,
    username
  })
  
  const onPasswordChange = password => setUser({
    ...user,
    password
  })

  const onSignIn = () => axios.post('/login', user)
  const onHealthCheck = async () => {
    const { data: { health } } = await axios.get('/health')
    setHealth(health || 'N/A')
  }

  return(
    <div>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={e => onUsernameChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={e => onPasswordChange(e.target.value)}
      />
      <button onClick={onSignIn}>
        Sign In
      </button>
      <button onClick={onHealthCheck}>
        Health Check
      </button>
      <p>{health}</p>
    </div>
  )
}

