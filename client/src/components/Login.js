import React, { useState } from 'react'
import axios from 'axios';

export default function LoginForm(props) {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const initialIdentity = { username: '', authenticated: '' }
  const [identity, setIdentity] = useState(initialIdentity)
  const resetIdentity = () => setIdentity(initialIdentity)

  const initialHealth = 'N/A'
  const [health, setHealth] = useState(initialHealth)
  const resetHealth = () => setHealth(initialHealth)

  const onUsernameChange = username => setUser(prevUser => 
    ({ ...prevUser, username })
  )

  const onPasswordChange = password => setUser(prevUser =>
    ({ ...prevUser, password })
  )

  const onSignIn = async () => {
    try {
      const { data: { user: { username }, authenticated } } = await axios.post('/login', user)
      
      setIdentity({ username, authenticated })
    } catch (e) {
      console.error(e)
      resetIdentity()
    }
  }

  const onSignOut = async () => {
    try {
      await axios.get('/logout')
      resetIdentity()
      resetHealth()
    } catch (e) {
      console.error(e)
    }
  }

  const onHealthCheck = async () => {
    try {
      const { data: { health } } = await axios.get('/health')
      setHealth(health)
    } catch (e) {
      console.error(e)
      resetHealth()
    }
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
      <button onClick={onSignOut}>
        Sign Out
      </button>
      <button onClick={onHealthCheck}>
        Health Check
      </button>
      <p>{ identity.authenticated ? `Signed in as ${identity.username}` : 'Not signed in' }</p>
      <p>Health: {health}</p>
    </div>
  )
}

