import React, { useState } from 'react'
import axios from 'axios';

export default function LoginForm(props) {

  const [user, setUser] = useState({
    username: '',
    password: '',
    authenticated: false
  })

  const [health, setHealth] = useState('N/A')

  const onUsernameChange = username => setUser(prevUser => 
    ({ ...prevUser, username })
  )

  const onPasswordChange = password => setUser(prevUser =>
    ({ ...prevUser, password })
  )

  const onSignIn = async () => {
    try {
      await axios.post('/login', user)
      setUser(prevUser => ({ ...prevUser, authenticated: true }))
    } catch {
      setUser(prevUser => ({ ...prevUser, authenticated: false }))
    }
  }

  const onHealthCheck = async () => {
    const { data: { health } } = await axios.get('/health')
    setHealth(health || 'N/A')
  }

  return(
    <div>
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
      <p>{ user.authenticated ? '' : 'Not' } Signed In</p>
      <p>Health: {health}</p>
    </div>
  )
}

